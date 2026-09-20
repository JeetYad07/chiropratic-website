import { clinicInfo } from '../data/clinicInfo';
import { doctorProfile } from '../data/doctor';

export function getLocalBusinessSchema() {
  return generateClinicSchema();
}

export function generateClinicSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalClinic', 'Physician'],
    name: clinicInfo.name,
    image: 'https://drhashichiropractic.com/images/doctor/dr-shinto-thomas.jpg',
    '@id': 'https://drhashichiropractic.com/#clinic',
    url: 'https://drhashichiropractic.com',
    telephone: clinicInfo.phone,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinicInfo.address.street,
      addressLocality: clinicInfo.address.city,
      addressRegion: 'Karnataka',
      postalCode: clinicInfo.address.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.8465,
      longitude: 77.6625,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    medicalSpecialty: 'Chiropractic',
    physician: {
      '@type': 'Physician',
      name: doctorProfile.name,
      jobTitle: doctorProfile.title,
      description: doctorProfile.bio,
      knowsLanguage: doctorProfile.languages,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: clinicInfo.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [clinicInfo.googleMapsUrl, clinicInfo.instagramUrl],
  };
}
