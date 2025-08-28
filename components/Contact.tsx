'use client'

import { useState } from 'react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitStatus = 'success' | 'error' | null

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null)

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters'
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.subject) {
      newErrors.subject = 'Subject is required'
    }
    if (!formData.message || formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // clear error as user types
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Format message for WhatsApp
      const whatsappMessage = `New Contact Form Submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\nMessage: ${formData.message}`
      const encodedMessage = encodeURIComponent(whatsappMessage)
      const whatsappUrl = `https://wa.me/9779842671691?text=${encodedMessage}`

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank')

      // Show success modal
      setSubmitStatus('success')
      setIsModalOpen(true)

      // Reset form
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error')
      setIsModalOpen(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contacts = [
    { name: 'CDO Office, Ilam', number: '027-520555' },
    { name: 'Ilam Hospital, Ilam', number: '027-520044' },
    { name: 'Nepal Red Cross Society, Ilam', number: '027-520102' },
    { name: 'District Police Office, Ilam', number: '100 / 027-520024' },
    { name: 'District Traffic Police Office, Ilam', number: '027-524695' },
    { name: 'Chamber of Commerce and Industry, Ilam', number: '027-520037' },
    { name: 'Ilam Municipality, Ilam', number: '027-520031' },
    { name: 'Tourist Information Center', number: '027-590079' },
    { name: 'Guide, Driver & Porter', number: '027-590355' },
    { name: 'Ambulance - Ilam Hospital', number: '9852680644' },
    { name: 'Nepal Red Cross Society', number: '9842627333 / 9815937888' },
    { name: 'Ilam Municipality', number: '9804917000 / 9852685236' },
  ]

  return (
    <section id="contact" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for any inquiries or bookings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 border-b-2 border-green-300 pb-2">
              Important Contact Numbers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contacts.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-lg bg-green-50 hover:bg-green-100 transition-colors flex flex-col relative"
                >
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-gray-700 mt-1">{item.number}</span>
                  <button
                    onClick={() => navigator.clipboard.writeText(item.number)}
                    className="absolute top-2 right-2 text-green-600 hover:text-green-800"
                    aria-label={`Copy number for ${item.name}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12M8 11h12M8 15h12M4 7h.01M4 11h.01M4 15h.01" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {['name','email','subject','message'].map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field}
                  </label>
                  {field !== 'message' ? (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      id={field}
                      name={field}
                      value={formData[field as keyof FormData]}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border ${errors[field as keyof FormData] ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent`}
                      required
                      disabled={isSubmitting}
                    />
                  ) : (
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className={`w-full px-4 py-2 border ${errors.message ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent`}
                      required
                      disabled={isSubmitting}
                    />
                  )}
                  {errors[field as keyof FormData] && (
                    <p className="mt-1 text-sm text-red-500">{errors[field as keyof FormData]}</p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.685" />
                    </svg>
                    Send via WhatsApp
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-sm w-full mx-4 transform transition-all"
            onClick={e => e.stopPropagation()}
          >
            {submitStatus === 'success' ? (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  Message Sent!
                </p>
                <p className="text-sm text-gray-600 mt-1 text-center">
                  Your message has been prepared for WhatsApp
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-gray-900">Oops!</p>
                <p className="text-sm text-gray-600 mt-1 text-center">
                  Something went wrong. Please try again.
                </p>
              </div>
            )}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Contact
