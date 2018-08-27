export class QuestionAnswer {
    Value: Value;
    Status: number;
    Message?: any;
    ErrorMessages: any[];
    WarningMessages: any[];
    SuccessMessages: any[];
}

export interface Question {
    QuestionAnswers?: any;
    QuestionId: number;
    ProblemSid: number;
    Question: string;
    QuestionSequence: number;
}

export interface Answer {
    QuestionId: number;
    NextQuestionId: number;
    Priority: string;
    AnswerSequence: number;
    Answer: string;
    AnswerId: number;
    TellCaller: string;
    AnswerFormat: string;
    SubmitTo: number;
    DispatchTo: number;
    SubmitToLayerName: string;
    SubmitToFieldName: string;
    DispatchToFieldName: string;
}

export interface Value {
    ProblemSid: number;
    BranchingModel: boolean;
    Questions: Question[];
    Answers: Answer[];
}

