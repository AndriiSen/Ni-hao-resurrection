import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  imageUrl = 'https://memepedia.ru/wp-content/uploads/2016/03/large_p19d7nh1hm1i37tnuim11ebqo5c1.jpg'
  longText = `I’m 74 now. I spent 40 years as an engineer. I did a bit of public speaking then, at conferences and lectures, but that was very different from appearing on television talkshows and YouTube videos.`
  userName = 'Happy Harold'
  userDecription = 'help me plz'
  profileLikes = 4
  profileShares = 6
  aboutMe = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, id recusandae itaque quam dicta quod, eos officia animi dolore blanditiis distinctio maiores, repudiandae magni? Ratione obcaecati ut odio itaque error explicabo? Repellat, ad hic sint repellendus, nemo culpa animi repudiandae necessitatibus distinctio facere perspiciatis. Sint hic natus libero laudantium iure maxime ea magni sunt magnam! Deserunt omnis rem unde, sunt dolorem minima, excepturi eaque, optio voluptatum harum consequatur sint quia sit laboriosam eveniet. Minus laudantium eaque architecto at?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem obcaecati, veritatis sunt incidunt dolores reprehenderit necessitatibus sed? Quam inventore impedit, eum veniam incidunt aliquam, illo iusto placeat nam fugit, eveniet voluptas quo quae praesentium saepe! Illo possimus soluta aperiam placeat, consequuntur consequatur, sequi sit praesentium repellat optio dolores eum aspernatur ut dolorum voluptatibus rem accusantium minima? Quisquam consequuntur quos molestiae incidunt ab quam ipsa corporis omnis ipsam harum, possimus esse beatae itaque, fugiat dolor vero sequi inventore eligendi et sint veritatis?'
  isAuthorized = true
  public idFromUrl!: string
  private routeSub!: Subscription;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.idFromUrl = params['id']
    });

    console.log(this.idFromUrl)
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
