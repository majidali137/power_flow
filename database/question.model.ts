// import { Schema, model, models, Document } from "mongoose";
// export interface IQuestion extends Document {
//   title: string;
//   content: string;
//   tags: Schema.Types.ObjectId[];
//   views: number;
//   upvoted: Schema.Types.ObjectId[];
//   author: Schema.Types.ObjectId;
//   answers: Schema.Types.ObjectId[];
//   createdAt: Date;
// }

// const QuestionsScheme = new Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
//   views: { type: Number, default: 0 },
//   upvote: [{ type: Schema.Types.ObjectId, ref: "User" }],
//   downvote: [{ type: Schema.Types.ObjectId, ref: "User" }],
//   author: { type: Schema.Types.ObjectId, ref: "User" },
//   answer: { type: Schema.Types.ObjectId, ref: "Answer" },
//   createdAt: { type: Date, default: Date.now },
// });

// const Question = models.Question || model("Question", QuestionsScheme);

// export default Question;


import { Schema, model, models, Document } from "mongoose";

export interface IQuestion extends Document {
  title: string;
  content: string;
  tags: Schema.Types.ObjectId[];
  views: number;
  upvote: Schema.Types.ObjectId[];
  downvote: Schema.Types.ObjectId[];
  author: Schema.Types.ObjectId;
  answer: Schema.Types.ObjectId;
  createdAt: Date;
}

const QuestionSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
  views: { type: Number, default: 0 },
  upvote: [{ type: Schema.Types.ObjectId, ref: "User" }],
  downvote: [{ type: Schema.Types.ObjectId, ref: "User" }],
  author: { type: Schema.Types.ObjectId, ref: "User" },
  answer: { type: Schema.Types.ObjectId, ref: "Answer" },
  createdAt: { type: Date, default: Date.now }
});

const Question = models.Question || model<IQuestion>("Question", QuestionSchema);

export default Question;

