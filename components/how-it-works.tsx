export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Upload a Video",
      description: "Upload any cooking video from your device or paste a URL.",
    },
    {
      number: "2",
      title: "AI Analysis",
      description: "Our AI analyzes the video to identify ingredients, cooking methods, and meal types.",
    },
    {
      number: "3",
      title: "Get Recommendations",
      description: "Receive personalized meal ideas and a complete shopping list.",
    },
    {
      number: "4",
      title: "Order Ingredients",
      description: "Optionally order ingredients directly from partnered supermarkets.",
    },
  ]

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
      <div className="relative">
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-green-200 hidden md:block" />
        <div className="space-y-12 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row gap-8 ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="md:w-1/2 flex justify-center">
                <div className="bg-white p-6 rounded-xl shadow-sm max-w-md">
                  <div className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
              <div className="md:w-1/2 hidden md:flex items-center justify-center">
                <div className="w-64 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={`/placeholder.svg?height=192&width=256&text=Step ${step.number}`}
                    alt={`Step ${step.number} illustration`}
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

