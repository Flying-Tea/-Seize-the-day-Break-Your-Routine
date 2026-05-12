import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { ReflectionNavBar } from "../ui/reflectionNavBar";
import Modal from "../Modal";

type Reflection = {
  id: number;
  title: string;
  gif: string;
  quote: string;
  prompt: string;
  context: string;
};

type CommunityPost = {
  id: number;
  quote: string;
  response: string;
  likes: number;
};

type SavedReflection = {
  id: number;
  title: string;
  quote: string;
  response: string;
  date: string;
};

type Comment = {
  id: number;
  postId: number;
  text: string;
  date: string;
};

const reflections: Reflection[] = [
  {
    id: 1,
    title: "Carpe Diem",
    gif: "https://media.giphy.com/media/l0HlvtIPzPdt2usKs/giphy.gif",
    quote: "Carpe diem. Seize the day, boys.",
    prompt: "What is something you're putting off that you shouldn't be?",
    context:
      "Mr. Keating encourages students to make their lives extraordinary and not delay what matters."
  },
  {
    id: 2,
    title: "Neil's Struggle",
    gif: "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif",
    quote: "I just want to be myself.",
    prompt: "Have you ever felt pressure to live someone else's life?",
    context:
      "Neil faces pressure from his father to follow a strict path rather than his passion."
  },
  {
    id: 3,
    title: "O Captain! My Captain!",
    gif: "https://media.giphy.com/media/26xBwdIuRJiAIqHwA/giphy.gif",
    quote: "O Captain! My Captain!",
    prompt: "When would you stand up for what you believe in?",
    context:
      "Students show respect and defiance by standing on desks for Mr. Keating."
  }
];

const communityPosts: CommunityPost[] = [
  {
    id: 1,
    quote: "Carpe diem. Seize the day, boys.",
    response:
      "This quote made me realize how much time I spend waiting instead of doing.",
    likes: 41
  },
  {
    id: 2,
    quote: "I just want to be myself.",
    response:
      "A lot of students feel pressure to become what others expect from them.",
    likes: 34
  },
  {
    id: 3,
    quote: "O Captain! My Captain!",
    response:
      "Standing up for people you respect takes courage.",
    likes: 29
  },
  {
    id: 4,
    quote: "No matter what anybody tells you, words and ideas can change the world.",
    response:
      "This scene connects to how teachers and mentors shape who we become.",
    likes: 52
  }
];

export default function App() {
  const [responses, setResponses] = useState<Record<number, string>>(() => {
    if (typeof window === "undefined") return {};

    try {
      const savedResponses = localStorage.getItem("responses");
      return savedResponses ? (JSON.parse(savedResponses) as Record<number, string>) : {};
    } catch {
      return {};
    }
  });

  const [savedReflections, setSavedReflections] = useState<SavedReflection[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const savedJournal = localStorage.getItem("savedReflections");
      return savedJournal ? (JSON.parse(savedJournal) as SavedReflection[]) : [];
    } catch {
      return [];
    }
  });

  const [viewSaved, setViewSaved] = useState(false);

  const [likedPosts, setLikedPosts] = useState<Record<number, boolean>>(() => {
    if (typeof window === "undefined") return {};

    try {
      const savedLikes = localStorage.getItem("likedPosts");
      return savedLikes ? (JSON.parse(savedLikes) as Record<number, boolean>) : {};
    } catch {
      return {};
    }
  });

  const [comments, setComments] = useState<Comment[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      const savedComments = localStorage.getItem("comments");
      return savedComments ? (JSON.parse(savedComments) as Comment[]) : [];
    } catch {
      return [];
    }
  });

  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});

  const [showContext, setShowContext] = useState(false);

  const [currentReflectionIndex, setCurrentReflectionIndex] = useState(0);

  const [notification, setNotification] = useState<string | null>(null);

  const dailyReflection = reflections[currentReflectionIndex];

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;

      localStorage.setItem("responses", JSON.stringify(responses));
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
      localStorage.setItem("savedReflections", JSON.stringify(savedReflections));
    } catch (error) {
      console.error("Local storage error", error);
    }
  }, [responses, likedPosts, savedReflections]);

  useEffect(() => {
    localStorage.setItem("responses", JSON.stringify(responses));
  }, [responses]);

  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  useEffect(() => {
    localStorage.setItem(
      "savedReflections",
      JSON.stringify(savedReflections)
    );
  }, [savedReflections]);

  useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  const handleReflectionChange = (value: string) => {
    setResponses((prev: Record<number, string>) => ({
      ...prev,
      [dailyReflection.id]: value
    }));
  };

  const handleSaveReflection = (): void => {
    const currentResponse = responses[dailyReflection.id];

    if (!currentResponse?.trim()) {
      return;
    }

    const newReflection: SavedReflection = {
      id: Date.now(),
      title: dailyReflection.title,
      quote: dailyReflection.quote,
      response: currentResponse,
      date: new Date().toLocaleDateString()
    };

    setSavedReflections((prev: SavedReflection[]) => [newReflection, ...prev]);

    setResponses((prev) => ({
      ...prev,
      [dailyReflection.id]: ""
    }));

    setNotification("Reflection saved successfully!");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleUpvote = (id: number) => {
    setLikedPosts((prev: Record<number, boolean>) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleRerollQuote = () => {
    const newIndex = Math.floor(Math.random() * reflections.length);
    setCurrentReflectionIndex(newIndex);
  };

  const handleDeleteReflection = (id: number) => {
    setSavedReflections((prev) => prev.filter((ref) => ref.id !== id));
  };

  const handleCommentChange = (postId: number, value: string) => {
    setCommentInputs((prev) => ({
      ...prev,
      [postId]: value
    }));
  };

  const handleAddComment = (postId: number) => {
    const commentText = commentInputs[postId]?.trim();
    if (!commentText) return;

    const newComment: Comment = {
      id: Date.now(),
      postId,
      text: commentText,
      date: new Date().toLocaleDateString()
    };

    setComments((prev) => [...prev, newComment]);
    setCommentInputs((prev) => ({
      ...prev,
      [postId]: ""
    }));
  };

  const handleDeleteComment = (commentId: number) => {
    setComments((prev) => prev.filter((comment) => comment.id !== commentId));
  };

  const sortedPosts = useMemo(() => {
    return communityPosts
      .map((post) => ({
        ...post,
        displayLikes: post.likes + (likedPosts[post.id] ? 1 : 0)
      }))
      .sort((a, b) => b.displayLikes - a.displayLikes);
  }, [likedPosts]);

  if (viewSaved) {
    return (
      <>
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-4xl font-bold mb-2">
                  Your Reflections
                </h1>

                <p className="text-gray-600">
                  Personal thoughts you've saved from daily prompts.
                </p>
              </div>

              <Button onClick={() => setViewSaved(false)}>
                Back Home
              </Button>
            </div>

            {savedReflections.length === 0 ? (
              <Card className="rounded-3xl shadow-md">
                <CardContent className="p-8 text-center text-gray-600">
                  You haven't saved any reflections yet.
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {savedReflections.map((reflection) => (
                  <Card
                    key={reflection.id}
                    className="rounded-2xl shadow-md"
                  >
                    <CardContent className="p-6 flex flex-col gap-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h2 className="text-2xl font-bold">
                            {reflection.title}
                          </h2>

                          <p className="italic text-gray-600">
                            "{reflection.quote}"
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <p className="text-sm text-gray-500 whitespace-nowrap">
                            {reflection.date}
                          </p>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteReflection(reflection.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed">
                        {reflection.response}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
        <Modal isOpen={!!notification} onClose={() => setNotification(null)}>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4 text-white">Notification</h2>
            <p className="text-white">{notification}</p>
          </div>
        </Modal>
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mt-15">
          <ReflectionNavBar viewSaved={viewSaved} setViewSaved={setViewSaved} />
        </div>
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Daily Reflection
            </h1>

            <p className="text-gray-600">
              Inspired by Dead Poets Society
            </p>

            <div className="mt-4">
              <Button onClick={() => setViewSaved(true)}>
                View Your Reflections
              </Button>
            </div>
          </div>

          <Card className="rounded-3xl shadow-xl overflow-hidden">
            <img
              src={dailyReflection.gif}
              alt={dailyReflection.title}
              className="w-full h-75 object-cover"
            />

            <CardContent className="p-6 flex flex-col gap-5">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {dailyReflection.title}
                </h2>

                <p className="italic text-lg text-gray-700">
                  "{dailyReflection.quote}"
                </p>
              </div>

              <p className="text-lg font-medium">
                {dailyReflection.prompt}
              </p>

              <textarea
                className="border rounded-2xl p-4 min-h-35 resize-none"
                placeholder="Write your reflection..."
                value={responses[dailyReflection.id] || ""}
                onChange={(e) =>
                  handleReflectionChange(e.target.value)
                }
              />

              <div className="flex gap-3 flex-wrap">
                <Button onClick={handleSaveReflection}>
                  Save Reflection
                </Button>
                <Button
                  onClick={() => setShowContext(!showContext)}
                >
                  {showContext ? "Hide Context" : "Show Context"}
                </Button>
                <Button onClick={handleRerollQuote}>
                  Reroll Quote
                </Button>
              </div>

              {showContext && (
                <div className="bg-gray-100 rounded-2xl p-4 text-sm">
                  {dailyReflection.context}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">
                Community Reflections
              </h2>

              <p className="text-gray-600">
                Anonymous thoughts inspired by scenes and quotes from the film.
              </p>
            </div>

            <div className="grid gap-4">
              {sortedPosts.map((post) => {
                const postComments = comments.filter((comment) => comment.postId === post.id);
                return (
                  <Card
                    key={post.id}
                    className="rounded-2xl shadow-md"
                  >
                    <CardContent className="p-5 flex flex-col gap-4">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <p className="font-semibold text-lg">
                            "{post.quote}"
                          </p>

                          <p className="text-sm text-gray-500">
                            Anonymous Student
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">
                            ⭐ {post.displayLikes}
                          </p>

                          <Button
                            size="sm"
                            variant={
                              likedPosts[post.id]
                                ? "default"
                                : "outline"
                            }
                            onClick={() => handleUpvote(post.id)}
                          >
                            {likedPosts[post.id]
                              ? "Upvoted"
                              : "Upvote"}
                          </Button>
                        </div>
                      </div>

                      <p className="text-gray-700 leading-relaxed">
                        {post.response}
                      </p>

                      {/* Comments Section */}
                      <div className="border-t pt-4">
                        <div className="flex gap-2 mb-3">
                          <input
                            type="text"
                            className="flex-1 border rounded-lg px-3 py-2 text-sm"
                            placeholder="Add a comment..."
                            value={commentInputs[post.id] || ""}
                            onChange={(e) => handleCommentChange(post.id, e.target.value)}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleAddComment(post.id);
                              }
                            }}
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAddComment(post.id)}
                          >
                            Comment
                          </Button>
                        </div>

                        {postComments.length > 0 && (
                          <div className="space-y-2">
                            {postComments.map((comment) => (
                              <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                                <div className="flex justify-between items-start gap-2">
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-700">{comment.text}</p>
                                    <p className="text-xs text-gray-500 mt-1">{comment.date}</p>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                                    onClick={() => handleDeleteComment(comment.id)}
                                  >
                                    ✕
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={!!notification} onClose={() => setNotification(null)}>
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4 text-white">Notification</h2>
          <p className="text-white">{notification}</p>
        </div>
      </Modal>
    </>
  );
}
