import React, { useState } from "react";
import { Star, Send, ThumbsUp, User, Calendar } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const RecipeReviews = ({ recipeId, recipeName }) => {
  const { isAuthenticated, user, addReview, getRecipeReviews } = useAuth();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showForm, setShowForm] = useState(false);

  const reviews = getRecipeReviews(recipeId);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      alert("Devi essere autenticato per lasciare una recensione");
      return;
    }

    if (rating === 0) {
      alert("Seleziona un punteggio");
      return;
    }

    if (comment.trim().length < 10) {
      alert("Il commento deve contenere almeno 10 caratteri");
      return;
    }

    addReview(recipeId, rating, comment);
    setRating(0);
    setComment("");
    setShowForm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Oggi";
    if (diffDays === 1) return "Ieri";
    if (diffDays < 7) return `${diffDays} giorni fa`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} settimane fa`;
    return date.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recensioni</h2>
        {isAuthenticated && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium text-sm"
          >
            Scrivi recensione
          </button>
        )}
      </div>

      {reviews.length > 0 && (
        <div className="bg-orange-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-4xl font-bold text-orange-600">
                  {averageRating}
                </span>
                <div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= Math.round(averageRating)
                            ? "fill-orange-500 text-orange-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {reviews.length}{" "}
                    {reviews.length === 1 ? "recensione" : "recensioni"}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter((r) => r.rating === star).length;
                const percentage = (count / reviews.length) * 100;
                return (
                  <div key={star} className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 w-8">{star}★</span>
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500 transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="bg-gray-50 rounded-lg p-6 mb-6 border-2 border-orange-200">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            La tua recensione per {recipeName}
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valutazione *
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hoverRating || rating)
                        ? "fill-orange-500 text-orange-500"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                {rating === 1 && "Pessimo"}
                {rating === 2 && "Scarso"}
                {rating === 3 && "Buono"}
                {rating === 4 && "Ottimo"}
                {rating === 5 && "Eccellente"}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Commento * (min. 10 caratteri)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Condividi la tua esperienza con questa ricetta..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            />
            <p className="text-sm text-gray-500 mt-1">
              {comment.length} caratteri
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleSubmit}
              disabled={rating === 0 || comment.trim().length < 10}
              className="flex items-center space-x-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>Pubblica recensione</span>
            </button>
            <button
              onClick={() => {
                setShowForm(false);
                setRating(0);
                setComment("");
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              Annulla
            </button>
          </div>
        </div>
      )}

      {!isAuthenticated && !showForm && (
        <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg mb-6">
          <p className="text-sm">
            <strong>Accedi</strong> per lasciare una recensione e condividere la
            tua esperienza!
          </p>
        </div>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Nessuna recensione ancora
            </h3>
            <p className="text-gray-600">
              Sii il primo a recensire questa ricetta!
            </p>
          </div>
        ) : (
          reviews
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-lg p-5 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                      {review.userName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {review.userName}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(review.date)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= review.rating
                            ? "fill-orange-500 text-orange-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
                <div className="flex items-center space-x-4 mt-3 pt-3 border-t border-gray-200">
                  <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-orange-500 transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Utile</span>
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default RecipeReviews;
