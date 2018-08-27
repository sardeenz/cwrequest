import { map, tap } from 'rxjs/operators';
import { QuestionAnswer, Value } from './question-answer';
import { Component, OnInit } from '@angular/core';
import { CityworksService } from './cityworks.service';
import { ArcgisService } from './arcgis.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { ServiceRequest } from './service-request';
import { Buildings } from './buildings';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private requestid = '358589';
  private problemSid = '26072';
  private chkStatusresults: Subscription;
  private buildings: Buildings;
  private status: string;
  private serviceRequest: ServiceRequest;
  private questionAnswer: Value;

  customerForm: FormGroup;
  title = 'app';
  panelOpenState: boolean = false;
  test: any;
  questions: any;
  answers: any;
  all: void;
  x: any;
  answersArray = [];
  questionsArray = [];

  q: string;

  constructor(private fb: FormBuilder, private cityworksservice: CityworksService, private arcgisservice: ArcgisService) { }

  createForm() {
    this.customerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.email],
      phone: ['', Validators.required],
      details: ''
    });
  }

  save(theform, isValid: boolean) {
    console.log('inside save form', theform.firstname);
  }
  ngOnInit(): void {

    // initialize our form
    this.createForm();

    // we should move this to another method that is only invoked when check status field is submitted
    this.arcgisservice.getFacilities().subscribe(
      res => {  // we're subscribing to the returned value of getFacilities and we can call it whatever we want.
        console.log('data from buildings = ', (this.x = res.features[0].geometry.x));
      },
      err => {
        console.log('some error happened');
      }
    );

    // TODO: we should move this to another method that is called from a button and only invoked when check status field is submitted
    // this.cityworksservice.getServiceRequest(this.requestid).subscribe(
    //   ServiceRequestPayload => {
    //     console.log(
    //       'status = ',
    //       (this.serviceRequest = ServiceRequestPayload),
    //       (this.status = ServiceRequestPayload.Value.Status)
    //     );
    //   },
    //   err => {
    //     console.log('some error happened');
    //   }
    // );

    // this.cityworksservice.getQuestionAnswer(this.problemSid).subscribe(
    //   res => {
    //       this.questionsAnswer = res.Value,
    //       this.all = this.friendlyObject(this.questionsAnswer);
    //   },
    //   err => {
    //     console.log('some error happened');
    //   }
    // );

    this.cityworksservice.getQuestionAnswer(this.problemSid).pipe(
      tap(console.log),
      map((res: QuestionAnswer) => {
        this.questions = res.Value.Questions;
        this.answers = res.Value.Answers;
        this.questionAnswer = res.Value;
      }
      )).subscribe(z => {
        console.log('value of x is', z);
        for (let i = 0; i < this.questionAnswer.Answers.length; i++) {
          const questionIdFromAnswers = this.questionAnswer.Answers[i].QuestionId;
          this.q = this.getQuestion(i, questionIdFromAnswers);
          // console.log('answers for this question = ', this.questionAnswer.Answers[i].Answer);
          this.answersArray.push(this.questionAnswer.Answers[i].Answer);
          // console.log('question = ', this.q);
          // console.log('qArray = ', this.questionsArray);
          console.log('Array = ', this.answersArray);

        }
      });
  }

  getQuestion(i, questionIdFromAnswers) {
    for (let j = 0; j < this.questionAnswer.Questions.length; j++) {
      if (questionIdFromAnswers === this.questionAnswer.Questions[j].QuestionId) {
        this.questionsArray.push(this.questionAnswer.Questions[j].Question);
        console.log('qArray = ', this.questionsArray);

        return this.questionAnswer.Questions[j].Question;
        // return {
        //   qNum: this.questionAnswer.Questions[j].Question,
        //   chad: this.questionAnswer.Answers[j].Answer
        // };
      }
    }

  }
}
