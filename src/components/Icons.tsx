import { Users, Star, Lightbulb, Calendar, Clock, MapPin, Phone, Mail, ChevronDown, ArrowRight, CheckCircle, AlertCircle, XCircle } from 'lucide-react';

export const IconMap: Record<string, React.ElementType> = {
  Users,
  Star,
  Lightbulb,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  XCircle
};

export const getIcon = (name: string) => {
  return IconMap[name] || Star;
};

