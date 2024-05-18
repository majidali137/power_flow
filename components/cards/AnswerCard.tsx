import React from "react";
import Link from "next/link";
import Metric from "../shared/Metric";
import { formatNumber, getTimeStamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface Props {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };

  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string
  };
  upvotes: number;
  createdAt: Date;
}

const AnswerCard = ({
   clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: Props) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;
  return (
    <div
      // href={`/question/${question?._id}/#${_id}`}
      className="card-wrapper rounded-[10px] p-9 sm:px-11"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={`/question/${question._id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
            </h3>
          </Link>
          {/* <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
            {question.title}
          </h3> */}
        </div>
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type = "Answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>

      </div>
      <div className="flex-between mt-6 w-full flex-wrap gap-3 ">
        <Metric
          imgUrl={author?.picture}
          alt="user"
          value={author?.name}
          title={` - asked ${getTimeStamp(createdAt)}`}
          href={`/profile/${author?.clerkId}`}
          isAuthor
          textStyles="body-medium text-dark400_light700 "
          
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={formatNumber(upvotes)}
          title="Votes"
          textStyles="small-medium text-dark400_light800"
        />
        
         
      </div>
    </div>
  );
};

export default AnswerCard;
