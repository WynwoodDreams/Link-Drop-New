import Header from './components/Header'
import LeftSidebar from './components/LeftSidebar'
import Feed from './components/Feed'
import RightSidebar from './components/RightSidebar'

export default function Home() {
  return (
    <>
      <Header />
      <div className="app-layout">
        <LeftSidebar />
        <Feed />
        <RightSidebar />
      </div>
    </>
  )
}
