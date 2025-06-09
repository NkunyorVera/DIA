import { JobType } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { router } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import CustomText from "./CustomText";

type JobCardProps = {
  job: JobType;
  index?: string;
};

const JobCard: React.FC<JobCardProps> = ({ job, index }) => {
  return (
    <View
      key={job.$id || index}
      className="bg-white rounded-2xl p-5 shadow-lg border border-gray-300"
    >
      {/* Company Header */}
      <View className="flex-row justify-between items-start mb-3">
        <View>
          <CustomText className="text-lg font-bold text-gray-900">
            {job.company}
          </CustomText>
          <CustomText className="text-gray-500 text-sm">
            Deadline: {formatDate(job.deadline)}
          </CustomText>
        </View>
      </View>

      {/* Job Description */}
      <CustomText className="text-gray-600 text-sm mb-4">
        {job.description}
      </CustomText>

      {/* Job Title and Salary */}
      <View className="mb-4">
        <CustomText className="text-xl font-bold text-gray-900 mb-1">
          {job.title}
        </CustomText>
        <CustomText className="text-purple-400 font-medium">
          Salary: {job.salary}
        </CustomText>
      </View>

      {/* Apply Button */}
      <TouchableOpacity
        className="bg-purple-200 py-3 rounded-lg items-center border border-purple-600"
        onPress={() => router.push(`/(tabs)/(jobs)/details/${job.$id}`)}
      >
        <CustomText className="text-purple-600 font-bold">See more</CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default JobCard;
