import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

const supabaseUrl = 'https://aimistcqlndneimalstl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpbWlzdGNxbG5kbmVpbWFsc3RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTAyMDA1NjIsImV4cCI6MjAwNTc3NjU2Mn0.qHDDDVAtqG37P0nS9dqzvX6VWSMX00KsV877YXgdf38';
const supabase = createClient(supabaseUrl, supabaseKey);

const FullScreenImage = () => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetchLatestImage();

    const channel = supabase
      .channel('gurgaon')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'images' },
        payload => {
          setImageUrl(payload.new.url);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchLatestImage = async () => {
    try {
      const { data, error } = await supabase
        .from('images')
        .select('url')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      if (data) setImageUrl(data.url);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  };

  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 9999,
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
    objectPosition: 'center',
  };

  return (
    <div style={containerStyle}>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Latest uploaded image"
          style={imageStyle}
        />
      ) : (
        <p style={{ color: 'white', fontSize: '2rem' }}>Loading image...</p>
      )}
    </div>
  );
};

export default FullScreenImage;


// // import { useState, useEffect } from 'react';
// // import { createClient } from '@supabase/supabase-js';

// // // Supabase credentials
// // const supabaseUrl = 'https://ixdvhtnzvbnbxmtkqyxe.supabase.co';
// // const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4ZHZodG56dmJuYnhtdGtxeXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkzMTczOTEsImV4cCI6MjA0NDg5MzM5MX0.NUVrCRc0LTWhXZMsuZYIsLLiH_zhckfRygoi88Sue70';
// // const supabase = createClient(supabaseUrl, supabaseKey);

// // const FullScreenImage = () => {
// //   const [imageUrl, setImageUrl] = useState(null);

// //   useEffect(() => {
// //     fetchLatestImage();

// //     // Listen to real-time INSERT events on the images table
// //     const channel = supabase
// //       .channel('gurgaon') // The channel name, could be anything meaningful like 'gurgaon'
// //       .on('postgres_changes',
// //         { event: 'INSERT', schema: 'public', table: 'images' },
// //         (payload) => {
// //           // Update image URL when a new image is inserted
// //           setImageUrl(payload.new.url);
// //         }
// //       )
// //       .subscribe();

// //     // Cleanup subscription when the component unmounts
// //     return () => {
// //       supabase.removeChannel(channel);
// //     };
// //   }, []);

// //   // Function to fetch the latest image URL from the database
// //   const fetchLatestImage = async () => {
// //     try {
// //       const { data, error } = await supabase
// //         .from('images') // Select from the images table
// //         .select('url') // Only select the URL field
// //         .order('created_at', { ascending: false }) // Order by the most recent entry
// //         .limit(1) // Limit to one result
// //         .single(); // Get a single row

// //       if (error) throw error;
// //       if (data) setImageUrl(data.url); // Set the URL of the latest image
// //     } catch (error) {
// //       console.error('Error fetching image:', error);
// //     }
// //   };

// //   // Styling for full-screen image display
// //   const containerStyle = {
// //     position: 'fixed',
// //     top: 0,
// //     left: 0,
// //     width: '100vw',
// //     height: '100vh',
// //     backgroundColor: 'black',
// //     display: 'flex',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     overflow: 'hidden',
// //     zIndex: 9999,
// //   };

// //   const imageStyle = {
// //     width: '100%',
// //     height: '100%',
// //     objectFit: 'fill',
// //     objectPosition: 'center',
// //   };

// //   return (
// //     <div style={containerStyle}>
// //       {imageUrl ? (
// //         <img
// //           src={imageUrl}
// //           alt="Latest uploaded image"
// //           style={imageStyle}
// //         />
// //       ) : (
// //         <p style={{ color: 'white', fontSize: '2rem' }}>Loading image...</p>
// //       )}
// //     </div>
// //   );
// // };

// // export default FullScreenImage;





// import { useState, useEffect } from 'react';
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://vogewdoilqaqjlshdzue.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZvZ2V3ZG9pbHFhcWpsc2hkenVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzMjQ3OTUsImV4cCI6MjA0NjkwMDc5NX0.T1YTNPKH5Caxp1CQYiO6zwGKVcY7UHU0UkOYo6vdVGc';
// const supabase = createClient(supabaseUrl, supabaseKey);

// const FullScreenImage = () => {
//   const [imageUrl, setImageUrl] = useState(null);

//   useEffect(() => {
//     // Fetch the latest image initially
//     fetchLatestImage();

//     // Set up realtime subscription
//     const channel = supabase
//       .channel('table:public:images')  // Use explicit table reference for real-time subscription
//       .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'images' }, (payload) => {
//         if (payload.new?.url) {
//           setImageUrl(payload.new.url);
//         }
//       })
//       .subscribe();

//     // Clean up on unmount
//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   const fetchLatestImage = async () => {
//     try {
//       const { data, error } = await supabase
//         .from('images')
//         .select('url')
//         .order('created_at', { ascending: false })
//         .limit(1)
//         .single();

//       if (error) throw error;
//       if (data) setImageUrl(data.url);
//     } catch (error) {
//       console.error('Error fetching image:', error);
//     }
//   };

//   const containerStyle = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     width: '100vw',
//     height: '100vh',
//     backgroundColor: 'black',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     overflow: 'hidden',
//     zIndex: 9999,
//   };

//   const imageStyle = {
//     width: '100%',
//     height: '100%',
//     objectFit: 'fill',
//     objectPosition: 'center',
//   };

//   return (
//     <div style={containerStyle}>
//       {imageUrl ? (
//         <img
//           src={imageUrl}
//           alt="Latest uploaded image"
//           style={imageStyle}
//         />
//       ) : (
//         <p style={{ color: 'white', fontSize: '2rem' }}>Loading image...</p>
//       )}
//     </div>
//   );
// };

// export default FullScreenImage;
