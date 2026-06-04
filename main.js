import './style.css';
import { 
  createIcons, 
  Construction, 
  Settings, 
  Droplets, 
  Wrench, 
  Shield, 
  Handshake, 
  HardHat, 
  MapPin, 
  Phone, 
  Mail, 
  Eye, 
  Target, 
  Zap, 
  Star, 
  Sprout, 
  BookOpen, 
  User 
} from 'lucide';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Bandhan website loaded');
    
    // Initialize Lucide icons
    createIcons({
        icons: {
            Construction,
            Settings,
            Droplets,
            Wrench,
            Shield,
            Handshake,
            HardHat,
            MapPin,
            Phone,
            Mail,
            Eye,
            Target,
            Zap,
            Star,
            Sprout,
            BookOpen,
            User
        }
    });
});

