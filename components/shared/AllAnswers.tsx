// import React from "react";
// import Filter from "./Filter";
// import { AnswerFilters } from "@/constants/filters";
// import { getAnswers } from "@/lib/actions/answer.action";
// import Link from "next/link";
// import Image from "next/image";
// import { getTimeStamp } from "@/lib/utils";
// import ParseHTML from "./ParseHTML";
// import Votes from "./Votes";
// import Pagination from "./Pagination";

// interface Props {
//   questionId: string;
//   userId: string;
//   totalAnswers: number;
//   page?: number;
//   filter?: string;
// }

// const AllAnswers = async ({
//   questionId,
//   userId,
//   totalAnswers,
//   page,
//   filter,
// }: Props) => {
//   const result = await getAnswers({
//     questionId,
//     page: page ? +page : 1,
//     sortBy: filter,
//   });

//   return (
//     <div className="mt-11">
//       <div className="flex items-center justify-between">
//         <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
//         <Filter filters={AnswerFilters} />
//       </div>

//       <div>
//         {result?.answers.map((answer) => (
//           <article key={answer._id} className="light-border border-b py-10">
//             <div className="flex items-center justify-between">
//               <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
//                 <Link
//                   href={`/profile/${answer.author.clerkId}`}
//                   className="flex flex-1 items-start gap-1 sm:items-center"
//                 >
//                   <Image
//                     src={answer.author.picture}
//                     width={18}
//                     height={18}
//                     alt="Profile"
//                     className="rounded-full object-cover max-sm:mt-0.5"
//                   />
//                   <div className="flex flex-col sm:flex-row sm:items-center">
//                     <p className="body-semibold text-dark-300_light700">
//                       {answer.author.name}
//                     </p>
//                     <p className="small-regular text-light400_light500 mt-0.5 ml-0.5 line-clamp-1">
//                       answered {getTimeStamp(answer?.createdAt)}
//                     </p>
//                   </div>
//                 </Link>
//                 <div className="flex justify-end">
//                   <Votes
//                     type="Answer"
//                     itemId={JSON.stringify(answer._id)}
//                     userId={JSON.stringify(userId)}
//                     upvotes={answer.upvotes.length}
//                     hasupVoted={answer.upvotes.includes(userId)}
//                     downvotes={answer.downvotes.length}
//                     hasdownVoted={answer.downvotes.includes(userId)}
//                   />
//                 </div>
//               </div>
//             </div>
//             <ParseHTML data={answer.content} />
//           </article>
//         ))}
//       </div>
//       <div className="mt-10 w-full">
//         <Pagination
//         pageNumber={page ? +page:1}
//         isNext = {result.isNextAnswer}
//         />
//       </div>

//     </div>
//   );
// };

// export default AllAnswers;

import React from "react";
import Filter from "./Filter";
import { AnswerFilters } from "@/constants/filters";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimeStamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
import Pagination from "./Pagination";

interface Props {
  questionId: string;
  userId: string;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

const AllAnswers = async ({
  questionId,
  userId,
  totalAnswers,
  page = 1,
  filter,
}: Props) => {
  const result = (await getAnswers({
    questionId,
    page: +page,
    sortBy: filter,
  })) || { answers: [], isNextAnswer: false }; // Provide a default object if result is undefined

  const { answers, isNextAnswer } = result; // Destructure with default values

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>
      <div>
        {answers.length > 0 ? ( // Check if there are answers
          answers.map((answer) => (
            <article key={answer._id} className="light-border border-b py-10">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    width={18}
                    height={18}
                    alt="Profile"
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark-300_light700">
                      {answer.author.name}
                    </p>
                    <p className="small-regular text-light400_light500 mt-0.5 ml-0.5 line-clamp-1">
                      answered {getTimeStamp(answer?.createdAt)}
                    </p>
                  </div>
                </Link>
                <Votes
                  type="Answer"
                  itemId={JSON.stringify(answer._id)}
                  userId={JSON.stringify(userId)}
                  upvotes={answer.upvotes.length}
                  hasupVoted={answer.upvotes.includes(userId)}
                  downvotes={answer.downvotes.length}
                  hasdownVoted={answer.downvotes.includes(userId)}
                />
              </div>

              <ParseHTML data={answer.content} />
            </article>
          ))
        ) : (
          <p>No answers found.</p>
        )}
      </div>
      <div className="mt-10 w-full">
        <Pagination pageNumber={page} isNext={isNextAnswer} />
      </div>
    </div>
  );
};

export default AllAnswers;
