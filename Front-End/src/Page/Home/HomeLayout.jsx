import CampingHero from "@/components/Home/camping-hero"
import CampingGuide from "../../components/Home/Camping-Guide"
import FeatureCards from "../../components/Home/FeatureCards"
import Header from "../../components/Home/Header/Header"
import OutdoorActivities from "../../components/Home/OutdoorActivaties"
import AdventureScroller from "@/components/Home/adventure-scroller"
import PopularTours from "@/components/Home/popular-tours-component"
import AdventureBooking from "@/components/Home/adventure-booking-ui"
import TravelDestinations from "@/components/Home/travel-destinations"
import TravelTestimonial from "@/components/Home/travel-testimonial-ui"




function HomeLayout() {
  return (
    <div className='w-full h-full overflow-x-hidden'>
        <Header />
        <CampingGuide />
        <FeatureCards />
        <OutdoorActivities />
        <CampingHero />
        <AdventureScroller />
        <PopularTours />
        <AdventureBooking />
        <TravelDestinations />
        <TravelTestimonial />
        
      
       

    </div>
  )
}

export default HomeLayout