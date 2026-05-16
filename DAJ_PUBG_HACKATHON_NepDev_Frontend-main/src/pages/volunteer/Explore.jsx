import Nav from '../../components/VolNav';
import Header from '../../components/header'
const sampleStories = [
  { id: 1, title: "Overcoming Anxiety", content: "I joined a voice chat session and shared my struggles. With support, I feel more confident every day!" },
  { id: 2, title: "Finding Strength", content: "Hearing others' stories motivated me to take small steps towards healing. Anonymous chats really helped." },
];

export default function VolunteerExplore() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4 flex flex-col">
      <Header id="volunteer"/>
      <h1 className="text-3xl text-center font-bold mb-8 mt-8 text-blue-700 ">Volunteer Explore</h1>

      <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 ">Inspiring Stories</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {sampleStories.map(story => (
            <div
              key={story.id}
              className="border p-5 rounded-xl shadow-md bg-gray-50 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="font-semibold text-lg mb-2 text-gray-900">{story.title}</h3>
              <p className="text-gray-700">{story.content}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Nav />
      </div>
    </div>
  );
}
