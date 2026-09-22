import { clinicInfo } from '../data/clinicInfo';
import { doctorProfile } from '../data/doctor';
import { servicesData } from '../data/services';

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
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, UPI, Credit Card, Debit Card',
    hasMap: clinicInfo.googleMapsUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: clinicInfo.address.street,
      addressLocality: clinicInfo.address.locality,
      addressRegion: 'Karnataka',
      postalCode: clinicInfo.address.pincode,
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.8465,
      longitude: 77.6625,
    },
    areaServed: [
      {
        '@type': 'AdministrativeArea',
        name: 'Electronic City Phase 1, Bengaluru',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Electronic City Phase 2, Bengaluru',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Doddathoguru, Bengaluru',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Neeladri Road, Bengaluru',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Begur, Bengaluru',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'HSR Layout, Bengaluru',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    medicalSpecialty: 'Chiropractic',
    availableService: servicesData.map((s) => ({
      '@type': 'MedicalProcedure',
      name: s.title,
      description: s.shortDescription,
    })),
    physician: {
      '@type': 'Physician',
      name: doctorProfile.name,
      jobTitle: doctorProfile.title,
      description: doctorProfile.bio,
      knowsLanguage: doctorProfile.languages,
      medicalSpecialty: 'Chiropractic',
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
