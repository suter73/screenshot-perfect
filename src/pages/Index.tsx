import { useAuth } from '@/contexts/AuthContext';
import DoctorDashboard from './DoctorDashboard';
import PatientDashboard from './PatientDashboard';

export default function Index() {
  const { user } = useAuth();
  return user?.tipo === 'medico' ? <DoctorDashboard /> : <PatientDashboard />;
}
