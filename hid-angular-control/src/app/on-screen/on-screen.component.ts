import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';
import { elementOverAnother } from '../common/document-helper';

import { ControlProviderService } from '../core/services/control-provider.service';
import webgazer from '../core/webgazer/main.mjs';

@Component({
  selector: 'app-on-screen',
  templateUrl: './on-screen.component.html',
  styleUrls: ['./on-screen.component.scss'],
})
export class OnScreenComponent implements AfterViewInit, OnDestroy {

  private suportDiv: HTMLDivElement;
  private alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase();
  private defaultAlfabetoIndex = 1;
  public input = '';

  @ViewChild('inputElementRef')
  public inputElementRef: ElementRef<HTMLInputElement>;

  constructor(private controlProviderService: ControlProviderService) {
  }

  async ngAfterViewInit() {
    if (this.controlProviderService.isAnyDeviceConfigured()) {
      this.createAuxDisplay();
      await this.controlProviderService.connectControlHid();
      this.controlProviderService.getHIDPacketOutput().pipe(debounceTime(this.controlProviderService.getControlDebounceTime())).subscribe((e) => {
        this.reciveControlMovedEvent(e.detail);
      });
    }

    if (this.controlProviderService.getActiveControl() == 'EyeControl') {
      webgazer.setGazeListener((data, elapsedTime) => {
        if (data == null) {
          return;
        }
        var xprediction = data.x; //these x coordinates are relative to the viewport
        var yprediction = data.y; //these y coordinates are relative to the viewport

        const percentLeft = Number(this.suportDiv.style.left.substring(0, this.suportDiv.style.left.indexOf('%')));
        const percentTop = Number(this.suportDiv.style.top.substring(0, this.suportDiv.style.top.indexOf('%')));
        this.suportDiv.style.left = (percentLeft + data.x) > 100 ? '100%' : ((percentLeft + data.x) < 0 ? '0%' : (percentLeft + data.x) + "%");
        this.suportDiv.style.top = (percentTop + data.y) > 100 ? '100%' : ((percentTop + data.y) < 0 ? '0%' : (percentTop + data.y) + "%");
      }).begin((f) => { });
    }
  }

  ngOnDestroy(): void {
    if (this.suportDiv) {
      document.body.removeChild(this.suportDiv);
    }
  }

  //#region Suporte Controles HID
  private createAuxDisplay() {
    this.suportDiv = document.createElement("div");
    this.suportDiv.style.position = "absolute";
    this.suportDiv.style.left = "50%";
    this.suportDiv.style.top = "50%";
    this.suportDiv.style.width = "20px";
    this.suportDiv.style.height = "20px";
    this.suportDiv.style.background = "red";
    this.suportDiv.style.color = "blue";

    document.body.appendChild(this.suportDiv);
  }

  private reciveControlMovedEvent(packet) {
    if (!packet || !packet.actualOrientation) {
      return;
    }

    const {
      actualAccelerometer: accelerometer,
      buttonStatus: buttons,
      actualGyroscope: gyroscope,
      actualOrientation: orientation,
      actualOrientationQuaternion: orientationQuaternion,
      ringCon: ringCon,
    } = packet;

    const percentLeft = Number(this.suportDiv.style.left.substring(0, this.suportDiv.style.left.indexOf('%')));
    const percentTop = Number(this.suportDiv.style.top.substring(0, this.suportDiv.style.top.indexOf('%')));

    if (this.controlProviderService.getActiveControlType() == 'gyroscope') {
      if (Math.abs(accelerometer.y) > 0.009) {
        if (accelerometer.y > 0) {
          this.suportDiv.style.left = (percentLeft + 0.6) > 100 ? '100%' : ((percentLeft + 0.6) < 0 ? '0%' : (percentLeft + 0.6) + "%");
        } else {
          this.suportDiv.style.left = (percentLeft + -0.6) > 100 ? '100%' : ((percentLeft + -0.6) < 0 ? '0%' : (percentLeft + -0.6) + "%");
        }
      }

      if (accelerometer.x > 0 && Math.abs(accelerometer.x) > 0.005) {
        this.suportDiv.style.top = (percentTop + -1) > 100 ? '100%' : ((percentTop + -1) < 0 ? '0%' : (percentTop + -1) + "%");
      } else if (Math.abs(accelerometer.x) > 0.003) {
        this.suportDiv.style.top = (percentTop + 1) > 100 ? '100%' : ((percentTop + 1) < 0 ? '0%' : (percentTop + 1) + "%");
      }
    } else {
      const joystick = packet.analogStickRight ?? packet.analogStickLeft;
      if (joystick.horizontal > 0.1 || joystick.horizontal < -0.1) {
        this.suportDiv.style.left = (percentLeft + joystick.horizontal) > 100 ? '100%' : ((percentLeft + joystick.horizontal) < 0 ? '0%' : (percentLeft + joystick.horizontal) + "%");
      }

      if (joystick.vertical > 0.1 || joystick.vertical < -0.1) {
        this.suportDiv.style.top = (percentTop + joystick.vertical) > 100 ? '100%' : ((percentTop + joystick.vertical) < 0 ? '0%' : (percentTop + joystick.vertical) + "%");
      }
    }

    if (elementOverAnother(this.suportDiv, this.inputElementRef.nativeElement) && buttons.up) {
      this.inputElementRef.nativeElement.type = this.inputElementRef.nativeElement.value.substring(0, this.inputElementRef.nativeElement.value.length - 1) + this.alfabeto[this.defaultAlfabetoIndex];
      this.defaultAlfabetoIndex += 1;
    } else if (elementOverAnother(this.suportDiv, this.inputElementRef.nativeElement) && buttons.right) {
      this.inputElementRef.nativeElement.type += this.alfabeto[0];
      this.defaultAlfabetoIndex = 1;
    }
  }
  //#endregion
}

