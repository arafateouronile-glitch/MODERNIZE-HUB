// Mock storage service for tests
export const mockStorage = {
  async getLeads() {
    return []
  },
  async saveLead(lead) {
    return {
      id: 'mock-id-' + Date.now(),
      ...lead,
      created_at: new Date().toISOString(),
      status: 'new',
    }
  },
  async getBlogPosts() {
    return []
  },
  async saveBlogPost(post) {
    return {
      id: 'mock-id-' + Date.now(),
      ...post,
      created_at: new Date().toISOString(),
    }
  },
  async deleteBlogPost(id) {
    return true
  },
  async getTestimonials() {
    return []
  },
  async saveTestimonial(testimonial) {
    return {
      id: 'mock-id-' + Date.now(),
      ...testimonial,
      created_at: new Date().toISOString(),
    }
  },
  async deleteTestimonial(id) {
    return true
  },
}



