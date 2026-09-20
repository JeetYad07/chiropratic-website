export interface ClinicInfo {
  name: string;
  tagline: string;
  doctorName: string;
  doctorTitle: string;
  rating: number;
  reviewCount: number;
  category: string;
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  address: {
    street: string;
    locality: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    full: string;
    landmark: string;
    plusCode: string;
  };
  hours: {
    days: string;
    time: string;
  }[];
  googleMapsUrl: string;
  googleMapsEmbedUrl: string;
  instagramUrl: string;
  instagramHandle: string;
}

export const clinicInfo: ClinicInfo = {
  name: "Dr Hashi Chiropractic",
  tagline: "Personalized Chiropractic Care & Spinal Wellness in Electronic City",
  doctorName: "Dr Shinto Thomas",
  doctorTitle: "Chiropractic Specialist & Wellness Practitioner",
  rating: 5.0,
  reviewCount: 77,
  category: "Wellness Center & Chiropractic Clinic",
  phone: "+919645010120",
  phoneDisplay: "+91 96450 10120",
  whatsappNumber: "919645010120",
  address: {
    street: "13th Cross, Neeladri Rd",
    locality: "Electronic City",
    area: "Doddathoguru",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560100",
    full: "13th Cross, Neeladri Rd, Electronic City, Doddathoguru, Bengaluru, Karnataka 560100",
    landmark: "Above Cavanio Family Salon, Neeladri Road",
    plusCode: "RJRW+8Q Doddathoguru, Karnataka"
  },
  hours: [
    { days: "Monday – Saturday", time: "9:00 AM – 6:00 PM" },
    { days: "Sunday", time: "By Prior Appointment" }
  ],
  googleMapsUrl: "https://maps.google.com/?q=Dr+Hashi+Chiropractic+Neeladri+Rd+Electronic+City+Bengaluru",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.965829910444!2d77.6521!3d12.8456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6c568910b82f%3A0x6b77241cf130a84e!2sDr%20Hashi%20Chiropractic!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  instagramUrl: "https://www.instagram.com/chiro_hashi/",
  instagramHandle: "@chiro_hashi"
};
