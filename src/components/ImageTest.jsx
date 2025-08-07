import { useState } from 'react';
import OptimizedImage from './OptimizedImage';

const ImageTest = () => {
    const [testImages] = useState([
        '/static/sandakpur.jpg',
        '/static/ilam_tea_garden.jpg',
        '/static/patenagi.jpg',
        '/static/shree_antu.jpg',
        '/static/panitar_tea_state.jpg',
        '/static/gajurmukhi_devi_temple.jpg',
        '/static/didi_bahini_jharna.jpg',
        '/static/seti_devi_temple.jpg',
        '/static/maisthan_temple.jpg',
        '/static/ilam_tea_factory.jpg',
        '/static/sukilumba_airport.jpg',
        '/static/sukilumba_devithan.jpg',
        '/static/bhimsenthan.jpg',
        '/static/sakela_tham.jpg',
        '/static/siddhithumka.jpg',
        '/static/sanu_pathivara_temple.jpg',
        '/static/mahabhir_rock_climbing.jpg',
        '/static/bouddha_park.jpg',
        '/static/singhabahini.jpg',
        '/static/narayanthan_temple.jpg',
        '/static/ilam_view_tower.jpg',
        '/static/bhalu_dhunga.jpg',
        '/static/mahendra_ratna_multiple_campus.jpg',
        '/static/ilam_durbar.jpg',
        '/static/maibhagawati_briddhashram.jpg',
        '/static/mangmalung.jpg',
        '/static/gumba_danda.jpg'
    ]);

    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8 text-center">Image Loading Test</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testImages.map((imageSrc, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-lg font-semibold mb-2">
                            Test Image {index + 1}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">{imageSrc}</p>
                        <div className="h-48 overflow-hidden rounded">
                            <OptimizedImage
                                src={imageSrc}
                                alt={`Test image ${index + 1}`}
                                className="w-full h-full object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageTest; 