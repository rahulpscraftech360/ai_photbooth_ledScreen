import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Supabase Client Setup
const supabaseUrl = 'https://fuhqxfbyvrklxggecynt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1aHF4ZmJ5dnJrbHhnZ2VjeW50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4ODk0MzcsImV4cCI6MjA1MzQ2NTQzN30.0r2cHr8g6nNwjaVaVGuXjo9MXNFu9_rx40j5Bb3Ib2Q'; // Replace with environment variable
const supabase = createClient(supabaseUrl, supabaseKey);

const FullScreenImage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLatestImage();

    // Real-time subscription
    const channel = supabase
      .channel('images')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'images' },
        (payload) => {
          console.log('New image detected:', payload);
          const newPath = payload.new?.path;
          if (newPath) {
            const { data } = supabase.storage.from('images').getPublicUrl(newPath);
            setImageUrl(data.publicUrl);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const fetchLatestImage = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.storage.from('images').list('gurgaon', {
        limit: 1,
        sortBy: { column: 'created_at', order: 'desc' },
      });

      if (error) throw error;
      if (data.length > 0) {
        const latestImagePath = `gurgaon/${data[0].name}`;
        const { data: urlData } = supabase.storage.from('images').getPublicUrl(latestImagePath);
        setImageUrl(urlData.publicUrl);
      }
    } catch (error) {
      console.error('Error fetching image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
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
      }}
    >
      {loading ? (
        <p style={{ color: 'white', fontSize: '2rem' }}>Loading image...</p>
      ) : imageUrl ? (
        <img
          src={imageUrl}
          alt="Latest uploaded image"
          style={{
            width: '100vw', // Ensure full screen width
            height: '100vh', // Ensure full screen height
          }}
        />
      ) : (
        <p style={{ color: 'white', fontSize: '2rem' }}>No image available</p>
      )}
    </div>
  );
};

export default FullScreenImage;
