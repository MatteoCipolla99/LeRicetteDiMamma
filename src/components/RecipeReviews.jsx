import React, { useState } from "react";
import { Star, User, MessageSquare } from "lucide-react";

const RecipeReviews = ({ reviews = [], onAddReview, isLoggedIn }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddReview({ rating, comment, date: new Date().toLocaleDateString() });
      setComment("");
      setRating(5);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
      <h3 className="text-2xl font-bold font-serif mb-6 flex items-center gap-2">
        <MessageSquare className="text-orange-500" />
        Recensioni della Community
      </h3>

      {/* Lista Recensioni */}
      <div className="space-y-6 mb-8">
        {reviews.length > 0 ? (
          reviews.map((review, idx) => (
            <div
              key={idx}
              className="border-b border-gray-100 last:border-0 pb-6 last:pb-0"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-orange-100 p-2 rounded-full">
                    <User size={16} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-800">
                      {review.user}
                    </p>
                    <p className="text-xs text-gray-400">
                      {review.date || "Oggi"}
                    </p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed pl-10">
                {review.comment}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic text-center py-4">
            Nessuna recensione ancora. Sii il primo a commentare!
          </p>
        )}
      </div>

      {/* Form Aggiungi Recensione */}
      {isLoggedIn ? (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 p-6 rounded-xl border border-gray-200"
        >
          <h4 className="font-bold text-gray-700 mb-3">
            Lascia la tua opinione
          </h4>

          <div className="flex items-center gap-1 mb-4">
            <span className="text-sm text-gray-600 mr-2">Il tuo voto:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <Star
                  size={24}
                  className={`${
                    star <= (hoverRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Cosa ne pensi di questa ricetta? Consigli per migliorarla?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm min-h-[100px] resize-none"
            required
          />

          <div className="flex justify-end mt-3">
            <button
              type="submit"
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors shadow-sm"
            >
              Pubblica Recensione
            </button>
          </div>
        </form>
      ) : (
        <div className="bg-orange-50 p-4 rounded-lg text-center text-orange-800 text-sm">
          Effettua il login per lasciare una recensione.
        </div>
      )}
    </div>
  );
};

export default RecipeReviews;
