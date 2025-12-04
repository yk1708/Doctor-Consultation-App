import { Doctor } from "@/lib/types";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Award, Heart, MapPin, Star, MessageSquare } from "lucide-react";
import { Badge } from "../ui/badge";

interface Review {
  _id: string;
  rating: number;
  feedback?: string;
  feedbackDate: string;
  patientId: {
    name: string;
    profileImage?: string;
  };
}

interface DoctorPrfileInterface {
  doctor: Doctor & { reviews?: Review[] };
}
const DoctorProfile = ({ doctor }: DoctorPrfileInterface) => {
  return (
    <Card className="sticky top-8 shadow-lg border-0">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <Avatar className="w-32 h-32 mx-auto right-4 rign-blue-100">
            <AvatarImage
              src={doctor?.profileImage}
              alt={doctor?.name}
            ></AvatarImage>
            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600  text-white text-2xl font-bold ">
              {doctor?.name?.charAt(0)?.toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {doctor.name}
          </h2>
          <p className="text-gray-600 mb-1">{doctor.specialization}</p>
          <p className="text-sm text-gray-500 mb-2">{doctor.qualification}</p>
          <p className="text-sm text-gray-500 mb-4">
            {doctor.experience} years experience
          </p>

          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="flex items-center space-x-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(doctor.averageRating || 0)
                        ? "fill-orange-400 text-orange-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {doctor.averageRating
                  ? doctor.averageRating.toFixed(1)
                  : "No ratings yet"}
              </span>
            </div>
            {(doctor.totalRatings ?? 0) > 0 && (
              <div className="text-sm text-gray-500">
                ({doctor.totalRatings ?? 0} {(doctor.totalRatings ?? 0) === 1 ? "review" : "reviews"})
              </div>
            )}
          </div>

          <div className="flex justify-center flex-wrap gap-2 mb-6">
            {doctor.isVerified && (
              <Badge
                variant="secondary"
                className="bg-green-100 text-green-800"
              >
                <Award className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}

            {doctor.category.map((cat, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="bg-blue-100 text-blue-800"
              >
                {cat}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-x-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">About</h3>
            <p className="text-sm text-gray-600">{doctor.about}</p>
          </div>

          {doctor.hospitalInfo && (
            <div className="bf-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">
                Hospital/Clinic
              </h3>
              <div className="text-sm text-gray-600">
                <p className="font-medium">{doctor.hospitalInfo.name}</p>
                <p>{doctor.hospitalInfo.address}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{doctor.hospitalInfo.city}</span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <div>
              <p className="text-sm text-green-700 font-medium">
                Consultation Fee
              </p>
              <p className="text-2xl text-green-800 font-bold">
                ₹{doctor.fees}
              </p>
              <p className="text-xs text-green-600 ">
                {doctor.slotDurationMinutes} minutes session
              </p>
            </div>
            <div className="text-green-600">
              <Heart className="w-8 h-8" />
            </div>
          </div>

          {/* Patient Reviews Section */}
          {doctor.reviews && doctor.reviews.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Patient Reviews</h3>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {doctor.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-gray-50 p-3 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={review.patientId?.profileImage} />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                          {review.patientId?.name?.charAt(0)?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {review.patientId?.name}
                          </p>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-3 h-3 ${
                                  star <= review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        {review.feedback && (
                          <p className="text-xs text-gray-600 mb-1">
                            {review.feedback}
                          </p>
                        )}
                        <p className="text-xs text-gray-400">
                          {new Date(review.feedbackDate).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorProfile;
