import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment } from '../shared/comment';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;

  commentForm: FormGroup;
  comment: Comment;
  @ViewChild('cform') commentFormDirective;

  formErrors = {
    'author': '',
    'rating': '',
    'comment': ''
  };

  validationMessages = {
    'author': {
      'required':      'Author is required.',
      'minlength':     'Author must be at least 2 characters long.'
    },
    'rating': {
      'required':      'Rating is required.'
    },
    'comment': {
      'required':      'Comment is required.'
    }
  };

  constructor(private dishService: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private formBuilder: FormBuilder) 
  {
    this.createForm();
  }

  ngOnInit() {
    this.dishService.getDishIds()
      .subscribe((dishIds) => this.dishIds = dishIds);

    //dishdetail/{id}
    this.route.params
      .pipe(switchMap((params: Params) => this.dishService.getDish(params["id"])))
      .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); }); //cada vez la URL cambie, llamaremos a setPrevNext para que calcule anterior y siguiente

    //const id = this.route.snapshot.params["id"]; //snapshot es un observador de los parametros de la URL

    // this.dishService.getDish(id)
    //   .then(dish => this.dish = dish);
    // this.dishService.getDish(id)
    //   .subscribe(dish => this.dish = dish);
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    console.log(index);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
    // var previo = index - 1;
    // if(previo < 0)
    //   previo = this.dishIds.length - 1;
    // this.prev = this.dishIds[previo];
    // var siguiente = index + 1;
    // if(siguiente >= this.dishIds.length)
    //   siguiente = 0;
    // this.next = this.dishIds[siguiente];
  }

  goBack(): void {
    this.location.back();
  }

  createForm() {
    this.commentForm = this.formBuilder.group({
      author: ['', [Validators.required, Validators.minLength(2)] ],
      rating: ['', [Validators.required] ],
      comment: ['', [Validators.required] ]
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); //reset form validation message
  }

  onValueChanged(data?: any)
  {
    //console.log("onValueChanged");
    //si no se ha creado commentForm, salir (return)
    if (!this.commentForm)
      return;
    
    //console.log("Existe commentForm");
    const form = this.commentForm;
    for (const field in this.formErrors)
    {
      //console.log("field = " + field);
      if (this.formErrors.hasOwnProperty(field))
      {
        //console.log("this.formErrors[field] = " + this.formErrors[field]);

        //clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid)
        {
          const messages = this.validationMessages[field];
          for (const key in control.errors)
          {
            if(control.errors.hasOwnProperty(key))
            {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    var date = new Date();
    this.comment.date = date.toISOString();
    console.log(this.comment);
    this.dish.comments.push(this.comment);

    this.commentForm.reset({
      name: '',
      rating: 0,
      comment: ''
    });
    //console.log("commentForm.reset");
    this.commentFormDirective.resetForm();
    //console.log("commentFormDirective.resetForm");
  }
}
