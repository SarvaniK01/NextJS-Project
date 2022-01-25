import Head from "next/head";

import { MongoClient } from "mongodb";

import { useEffect, useState } from "react";

import Layout from "../components/layout/Layout";
import MeetupList from "../components/meetups/MeetupList";

// const Dummy_meetups = [
//   {
//     id:'m1',
//     title:'School Meetup',
//     image:'https://upload.wikimedia.org/wikipedia/commons/5/5f/Larkmead_School%2C_Abingdon%2C_Oxfordshire.png',
//     address:'Pune',
//     description:'School reunion'
//   },
//   {
//     id:'m2',
//     title:'College Meetup',
//     image:'https://us.123rf.com/450wm/hulv850627/hulv8506271511/hulv850627151101788/50623260-hall-building-in-college.jpg?ver=6',
//     address:'Hyderabad',
//     description:'College reunion'
//   }
// ]

function HomePage(props) {

  // Before using getStaticProps()
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(()=> {
  //   // send a http request and fetch data
  //   setLoadedMeetups(Dummy_meetups)
  // },[])

  return(
    <>
      <Head>
        <title>React Meetups</title>
        <meta 
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={props.meetups}/> 
    </>
  );
};



// the below function will not run during the build process but will run on server after deployment
// The below code will always run on the server
// cannot use revalidate
// runs for every incoming request (adv & dis-adv)
// can be used when there are more requests coming(even revalidate can't work)

// export async function getServerSideProps(context) {
  
//   const req = context.req;
//   const res = context.res;

//   // fetch data from an API
//   return{
//     props:{
//       meetups: Dummy_meetups
//     },
//   };
// };

// The below code will never execute on the client side
// The below process will be executed during the build process
// page will be faster(cached and reused)
export async function getStaticProps() {
  //  fetch data from an API or database

  const client = await MongoClient.connect('mongodb+srv://Sarvani:sarvanik60@cluster0.tau86.mongodb.net/meetups?retryWrites=true&w=majority');

  const db = client.db();

  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();

  client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        address: meetup.address,
        image:meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10
  };
};

export default HomePage;