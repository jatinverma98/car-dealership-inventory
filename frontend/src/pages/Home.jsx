import { useAuth } from '../context/AuthContext'
import PublicHome from '../components/PublicHome'
import DashboardHome from '../components/DashboardHome'

const Home = () => {
  const { user } = useAuth()

  if (user) {
    return <DashboardHome />
  }

  return <PublicHome />
}

export default Home