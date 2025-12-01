import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Check, X } from 'lucide-react'

const quizQuestions = [
  {
    id: 1,
    question: "Quel est votre objectif principal ?",
    options: [
      { value: 'leads', label: 'Générer plus de leads/clients', score: 3 },
      { value: 'credibility', label: 'Améliorer ma crédibilité en ligne', score: 2 },
      { value: 'modernize', label: 'Moderniser un site existant', score: 2 },
      { value: 'new', label: 'Créer mon premier site pro', score: 1 },
    ]
  },
  {
    id: 2,
    question: "Votre site actuel (si vous en avez un) :",
    options: [
      { value: 'none', label: "Je n'en ai pas encore", score: 1 },
      { value: 'old', label: 'Il date de +5 ans', score: 3 },
      { value: 'template', label: "C'est un template basique", score: 2 },
      { value: 'recent', label: "Récent mais pas assez performant", score: 2 },
    ]
  },
  {
    id: 3,
    question: "Combien de visiteurs/mois perdez-vous actuellement ?",
    options: [
      { value: 'none', label: 'Aucune idée (pas de stats)', score: 1 },
      { value: 'low', label: 'Moins de 100', score: 1 },
      { value: 'medium', label: '100-500', score: 2 },
      { value: 'high', label: '+500', score: 3 },
    ]
  },
  {
    id: 4,
    question: "Quel est votre budget pour ce projet ?",
    options: [
      { value: 'express', label: '1 500€ - 2 000€', score: 1 },
      { value: 'standard', label: '3 000€ - 4 000€', score: 2 },
      { value: 'premium', label: '5 000€ - 8 000€+', score: 3 },
      { value: 'unsure', label: 'Je ne sais pas encore', score: 0 },
    ]
  },
  {
    id: 5,
    question: "Quand souhaitez-vous démarrer ?",
    options: [
      { value: 'urgent', label: 'Dès que possible (cette semaine)', score: 3 },
      { value: 'soon', label: 'Dans les 2-4 semaines', score: 2 },
      { value: 'month', label: 'D\'ici 1-2 mois', score: 1 },
      { value: 'exploring', label: 'Je me renseigne pour l\'instant', score: 0 },
    ]
  },
]

const recommendations = {
  low: {
    title: "Formule Express",
    subtitle: "Parfait pour démarrer rapidement",
    description: "Vous avez besoin d'un coup de jeune rapide et efficace. Notre formule Express est idéale pour professionnaliser votre présence en ligne sans casser la banque.",
    price: "1 490€",
    cta: "Voir la Formule Express"
  },
  medium: {
    title: "Transformation Complète",
    subtitle: "Le choix optimal pour maximiser vos résultats",
    description: "Vous êtes prêt à passer au niveau supérieur. Cette formule vous garantit un site qui convertit et génère du ROI rapidement.",
    price: "3 490€",
    cta: "Voir la Transformation Complète"
  },
  high: {
    title: "Sur-Mesure Premium",
    subtitle: "Pour dominer votre marché",
    description: "Vous visez l'excellence absolue. Notre formule Premium vous positionne comme le leader incontesté de votre secteur.",
    price: "À partir de 5 990€",
    cta: "Découvrir le Premium"
  }
}

export const LeadQuiz = ({ isOpen, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)
  const [recommendation, setRecommendation] = useState(null)

  const handleAnswer = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }))
  }

  const goNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      calculateRecommendation()
    }
  }

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1)
    }
  }

  const calculateRecommendation = () => {
    const totalScore = Object.values(answers).reduce((sum, answer) => sum + answer.score, 0)
    const maxScore = quizQuestions.length * 3

    let rec
    if (totalScore >= maxScore * 0.7) {
      rec = recommendations.high
    } else if (totalScore >= maxScore * 0.4) {
      rec = recommendations.medium
    } else {
      rec = recommendations.low
    }

    setRecommendation(rec)
    setShowResult(true)
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
    setRecommendation(null)
  }

  const currentQ = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const canProceed = answers[currentQ?.id] !== undefined

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
        />

        {/* Quiz Container */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-3xl bg-surface border border-[#D9FF00]/20 shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-[#D9FF00] hover:text-black transition-colors z-10"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {!showResult ? (
            <>
              {/* Progress Bar */}
              <div className="h-2 bg-black/50">
                <motion.div
                  className="h-full bg-[#D9FF00]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Question Content */}
              <div className="p-8 md:p-12">
                <div className="mb-8">
                  <span className="font-mono text-xs text-[#D9FF00] uppercase tracking-wider">
                    Question {currentQuestion + 1} / {quizQuestions.length}
                  </span>
                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mt-4 leading-tight">
                    {currentQ.question}
                  </h3>
                </div>

                {/* Options */}
                <div className="space-y-4 mb-8">
                  {currentQ.options.map((option, idx) => (
                    <motion.button
                      key={option.value}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      onClick={() => handleAnswer(currentQ.id, option)}
                      className={`w-full p-6 text-left border-2 transition-all duration-300 ${
                        answers[currentQ.id]?.value === option.value
                          ? 'border-[#D9FF00] bg-[#D9FF00]/10'
                          : 'border-white/10 hover:border-[#D9FF00]/50 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-white text-lg">
                          {option.label}
                        </span>
                        {answers[currentQ.id]?.value === option.value && (
                          <Check className="w-6 h-6 text-[#D9FF00]" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between gap-4">
                  <button
                    onClick={goBack}
                    disabled={currentQuestion === 0}
                    className="px-6 py-3 border border-white/20 text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour
                  </button>

                  <button
                    onClick={goNext}
                    disabled={!canProceed}
                    className="px-8 py-3 bg-[#D9FF00] text-black font-bold hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                  >
                    {currentQuestion === quizQuestions.length - 1 ? 'Voir Mon Résultat' : 'Suivant'}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Results */
            <div className="p-8 md:p-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-[#D9FF00] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-black" />
                  </div>
                  <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
                    {recommendation.title}
                  </h3>
                  <p className="text-xl text-[#D9FF00] font-mono uppercase tracking-wide">
                    {recommendation.subtitle}
                  </p>
                </div>

                <div className="bg-black/30 border border-[#D9FF00]/20 p-8 mb-8">
                  <p className="text-lg text-white/90 leading-relaxed mb-6">
                    {recommendation.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-sm text-white/50">À partir de</span>
                    <span className="font-display text-4xl font-bold text-[#D9FF00]">
                      {recommendation.price}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => {
                      onClose()
                      document.getElementById('offres')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="flex-1 px-8 py-4 bg-[#D9FF00] text-black font-bold hover:bg-white transition-all"
                  >
                    {recommendation.cta}
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="px-8 py-4 border border-white/20 text-white hover:bg-white/5 transition-all"
                  >
                    Refaire le Quiz
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}


