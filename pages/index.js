import Layout from "../components/layout/Layout";

import MeetupList from "../components/meetups/MeetupList";

const Dummy_meetups = [
  {
    id:'m1',
    title:'School Meetup',
    image:'https://upload.wikimedia.org/wikipedia/commons/5/5f/Larkmead_School%2C_Abingdon%2C_Oxfordshire.png',
    address:'Pune',
    description:'School reunion'
  },
  {
    id:'m2',
    title:'College Meetup',
    image:'https://us.123rf.com/450wm/hulv850627/hulv8506271511/hulv850627151101788/50623260-hall-building-in-college.jpg?ver=6',
    address:'Hyderabad',
    description:'College reunion'
  }
]

function HomePage() {
  return(
    <>
      <MeetupList meetups={Dummy_meetups}/> 
    </>
  );
};

export default HomePage;