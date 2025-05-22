import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-team',
  templateUrl: './team.page.html',
  styleUrls: ['./team.page.scss'],
})
export class TeamPage{

  teamMembers = [
    {
      name: 'Sagun Giri',
      title: 'Managing Director',
      image: 'assets/images/logo-black.png'
    },
    {
      name: 'Atul Pokharel',
      title: 'VP - Operations',
      image: 'assets/images/logo-color.png'
    },
    {
      name: 'Anjal Shrestha',
      title: 'VP - Finance, Reporting',
      image: 'assets/images/logo-white.png'
    }
  ];

  @ViewChild(IonContent, { static: false })
  content!: IonContent;
  isArrowHidden = false;
  scrollTop!: number;

  constructor() {}

  ionViewDidEnter(){
    this.getScrollPosition();
    if (this.content) {
      this.content.ionScroll.subscribe((event) => {
        console.log('Scroll Event:', event);
        console.log('Scroll Top:', event.detail.scrollTop);
      });
    } else {
      console.error('IonContent not found.');
    }
  }

  async scroll(content: IonContent) {
    const scrollElement = await content.getScrollElement();
    const viewportHeight = scrollElement.clientHeight;
    content.scrollByPoint(0, viewportHeight, 1000);
    console.log(`Scroll by ${viewportHeight} pixels`);
    this.getScrollPosition();
  }

  getScrollPosition() {
    if (this.content) {
      this.content.getScrollElement().then((scrollElement) => {
        this.scrollTop = scrollElement.scrollTop;
        if(this.scrollTop !== 0){
          this.isArrowHidden = true
        }
        else{
          this.isArrowHidden = false
        }
        console.log('Scroll top:', scrollElement.scrollTop);
      }).catch(error => {
        console.error('Error getting scroll element:', error);
      });
    }
  }

  handleScroll(event: CustomEvent) {
    console.log('Scroll Event:', event);
    console.log('Scroll Top:', event.detail.scrollTop);
  }
}
