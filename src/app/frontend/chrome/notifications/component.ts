// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

import { Animations } from '../../common/animations/animations';
import {
  Notification,
  NotificationsService,
} from '../../common/services/global/notifications';

@Component({
  selector: 'kd-notifications',
  templateUrl: './template.html',
  styleUrls: ['./style.scss'],
  animations: [Animations.easeOut],
})
export class NotificationsComponent implements OnInit {
  isOpen_ = false;
  notifications: Notification[] = [];

  constructor(
    private readonly notifications_: NotificationsService,
    private readonly element_: ElementRef
  ) {}

  ngOnInit(): void {
    // this.transition_.onExit({}, () => {
    //   this.close_();
    // });
  }

  @HostListener('document:click', ['$event'])
  private onOutsideClick_(event: Event): void {
    if (!this.element_.nativeElement.contains(event.target) && this.isOpen()) {
      this.close_();
    }
  }

  load_(): void {
    this.notifications = this.notifications_.getNotifications();
  }

  open_(): void {
    this.load_();
    this.isOpen_ = true;
  }

  close_(): void {
    this.notifications_.markAllAsRead();
    this.isOpen_ = false;
  }

  isOpen(): boolean {
    return this.isOpen_;
  }

  toggle(): void {
    this.isOpen() ? this.close_() : this.open_();
  }

  remove(index: number): void {
    this.notifications_.remove(index);
  }

  clear(): void {
    this.notifications_.clear();
    this.load_();
  }

  getUnreadCount(): number {
    return this.notifications_.getUnreadCount();
  }
}
