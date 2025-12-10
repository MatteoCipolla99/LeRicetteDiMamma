import React, { useState } from "react";
import { Star, User, MessageSquare, Send } from "lucide-react";

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
    <div className="mt-16 pt-16 border-t border-gray-100">
      <h3 className="text-3xl font-serif font-bold text-gray-900 mb-8 flex items-center gap-3">
        <MessageSquare className="text-orange-500" />
        Cosa dice la Community
      </h3>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Lista Recensioni */}
        <div className="space-y-6 order-2 md:order-1">
          {reviews.length > 0 ? (
            reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4 transition-all hover:shadow-md"
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-sm ${
                    idx % 2 === 0
                      ? "bg-orange-100 text-orange-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {review.user.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-gray-900">
                      {review.user}
                    </span>
                    <span className="text-xs text-gray-400">
                      • {review.date || "Recente"}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic bg-gray-50 p-6 rounded-2xl text-center">
              Nessuna recensione ancora. Sii il primo a provare questa ricetta!
              🏅
            </p>
          )}
        </div>

        {/* Form */}
        <div className="order-1 md:order-2">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100 sticky top-32">
            <h4 className="font-bold text-xl text-gray-900 mb-2">
              Ti è piaciuta?
            </h4>
            <p className="text-gray-500 text-sm mb-6">
              Lascia un commento per aiutare gli altri cuochi.
            </p>

            {isLoggedIn ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-center gap-2 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110 focus:outline-none"
                    >
                      <Star
                        size={32}
                        className={`${
                          star <= (hoverRating || rating)
                            ? "fill-yellow-400 text-yellow-400 drop-shadow-sm"
                            : "text-gray-200"
                        } transition-colors`}
                      />
                    </button>
                  ))}
                </div>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Il segreto è aggiungere un pizzico di..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-sm min-h-[120px] resize-none transition-all placeholder:text-gray-400"
                  required
                />

                <button
                  type="submit"
                  className="w-full btn-primary py-3 rounded-xl shadow-lg"
                >
                  <Send size={18} /> Pubblica
                </button>
              </form>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 text-sm mb-4">
                  Effettua il login per recensire.
                </p>
                <Link
                  to="/"
                  className="text-orange-600 font-bold hover:underline"
                >
                  Torna alla Home
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeReviews;
