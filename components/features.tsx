import { Utensils, ShoppingCart, Clock, Sparkles } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <Utensils className="h-6 w-6 text-green-600" />,
      title: "Personalized Meal Ideas",
      description: "Get meal suggestions based on the ingredients and cooking styles in your video.",
    },
    {
      icon: <ShoppingCart className="h-6 w-6 text-green-600" />,
      title: "Smart Shopping Lists",
      description: "Automatically generate shopping lists with all the ingredients you'll need.",
    },
    {
      icon: <Clock className="h-6 w-6 text-green-600" />,
      title: "Save Time Planning",
      description: "Reduce meal planning time from hours to minutes with AI-powered suggestions.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-green-600" />,
      title: "Grocery Ordering",
      description: "Connect with local supermarkets to order ingredients with one click.",
    },
  ]

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Why Choose EcoDish</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-green-50 p-3 rounded-full w-fit mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

