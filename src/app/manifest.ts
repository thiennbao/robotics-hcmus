import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Robotics & IoT HCMUS',
    short_name: 'Robotics HCMUS',
    description: 'Robotics and IoT (Internet of Things) Club from University of Science, VNU-HCM',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  }
}