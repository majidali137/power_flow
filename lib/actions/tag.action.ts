" use server";

import User from "@/database/user.modal";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/tag.modal";
import Question from "@/database/question.model";
import { FilterQuery } from "mongoose";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    // find interaction for the user and group by tags......
    // Interaction..........
    return [
      { _id: "1", name: "tag" },
      { _id: "2", name: "tag2" },
    ];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();

    const { searchQuery, filter } = params;

    // Calculate the number of posts to skip based on the page number and page size
    // const skipAmount = (page - 1) * pageSize;

        // Ensure the page and pageSize parameters are valid, non-negative integers
        const validatedPage = Math.max(1, parseInt(params.page?.toString() || '1', 10));
        const validatedPageSize = Math.max(6, parseInt(params.pageSize?.toString() || '2', 10));
    
        // Calculate the number of posts to skip based on the page number and page size
        const skipAmount = (validatedPage - 1) * validatedPageSize;

    const query: FilterQuery<typeof Tag> = {};
    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" };
    }
    let sortOptions = {};

    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;

      case "recent":
        sortOptions = { createdAt: -1 };
        break;

      case "name":
        sortOptions = { name: -1 };
        break;

      case "old":
        sortOptions = { createdAt: 1 };
        break;

      default:
        break;
    }

    const totalTags = await Tag.countDocuments(query);
    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(validatedPageSize);
      // .limit(pageSize);

    const isNext = totalTags > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();
    const { tagId, searchQuery } = params;
    // Calculate the number of posts to skip based on the page number and page size
    // const skipAmount = (page - 1) * pageSize;
    // Ensure that 'page' and 'pageSize' are positive integers
    const validatedPage = Math.max(1, parseInt(params.page?.toString() || '1', 10));
    const validatedPageSize = Math.max(1, parseInt(params.pageSize?.toString() || '2', 10));

    // Calculate the number of posts to skip based on the validated page number and page size
    const skipAmount = (validatedPage - 1) * validatedPageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };
    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: validatedPageSize + 1,
        // limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });
    if (!tag) {
      throw new Error("Tag not found");
    }
    // const isNext = tag.questions.length > pageSize;
    // const questions = tag.questions;

    const isNext = tag.questions.length > validatedPageSize;
    const questions = tag.questions.slice(0, validatedPageSize);

    return { tagTitle: tag.name, questions,  isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();

    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);
    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
