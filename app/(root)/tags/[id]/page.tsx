import QuestionCard from '@/components/cards/QuestionCard'
import NoResult from '@/components/shared/NoResult'
import Pagination from '@/components/shared/Pagination'
import LocalSearchbar from '@/components/shared/search/LocalSearchbar'
import { getQuestionByTagId } from '@/lib/actions/tag.action'
import { URLProps } from '@/types'
import React from 'react'

const Page = async ({params, searchParams}: URLProps) => {
  const result = await getQuestionByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : -1,
    searchQuery: searchParams.q 
  })
  return (
    <>
    <h1 className="h1-bold text-dark100_light900">{result.tagTitle}</h1>

    <div className="mt-11 w-full">
      <LocalSearchbar
        route={`/tags/${params.id}`}
        iconPosition="left"
        imgSrc="/assets/icons/search.svg"
        placeholder="search for question"
        otherClasses="flex-1"
      />
      
    </div>

    <div className="mt-10 flex w-full flex-col gap-6">
      {/* Looping through questions */}
      {result.questions.length > 0 ? (
       // eslint-disable-next-line
        result.questions.map((question: any) => (
          <QuestionCard
            key={question._id}
            _id={question._id}
            title={question.title}
            tags={question.tags}
            author={question.author}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        ))
      ) : (
        <NoResult
          title="There's no tag question saved to show"
          description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. Your query could be the next big thing others learn from. Get involved! 💡"
          link="/ask-questions"
          linkTitle="Ask a Question"
        />
      )}
    </div>
    <div className="mt-10">
        <Pagination
        pageNumber={searchParams?.page ? +searchParams.page:1}
        isNext = {result.isNext}
        />
      </div>
  </>
  )
}

export default Page
 