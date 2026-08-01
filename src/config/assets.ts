const BASE = 'https://philip-portfolio-assets.s3.eu-north-1.amazonaws.com';

export const asset = (path: string) => `${BASE}/${path}`;

export const assets = {
  profilePhoto: asset('Alasya.jpg'),
  cv: asset('PHILIP_OLEMBO_CV.pdf'),
  cameraSlider: {
    fig1: asset('Figure_1_Motorized_Camera_Slider_Prototype.png'),
    fig2: asset('Figure_2_Electronics_Enclosure_Under_Sliding_Platform.png'),
    fig3: asset('Figure_3_NEMA_17_Drive_System_Detail.png'),
    fig4: asset('Figure_4_Camera_Carriage_and_Belt_Attachment.png'),
    fig5: asset('Figure_5_Arduino-Based_Slider_Control_Circuit.png'),
    fig6: asset('Figure_6_Motorized_Camera_Slider_in_Operation.png'),
  },
  creativeWork: {
    img1: asset('HBD-SIS-RITA-CEKZ-LOGISTICS.jpg'),
    img2: asset('HBD-DCN-LOTAN-CEKZ-LOVEWORLD-SATjpg.jpg'),
    img3: asset('HBD-DCN-LOTAN-CEKZ-LOGISTICS-2.jpg'),
    img4: asset('HBD-SIS-SHIREEN-CEKZ-LOGISTICS.jpg'),
    img5: asset('HBD-PST-MATILDA-CEKZ-LOGISTICS.jpg'),
    img6: asset('HBD-PST-NATHANIA-CEKZ-LOGISTICS.jpg'),
    img7: asset('HBD-PST-NATHANIA-CEKZ-SPECIAL-DUTY.jpg'),
    img8: asset('HBD-BABY-KEZA-SALAPEI-CEKZ-LOGISTICS.jpg'),
    img9: asset('HBD-BRO-SENTRIX-LTM_RADIO.jpg'),
    img10: asset('HBD-TRACY-ANYANGO-FROM-SIS-MAUREEN.jpg'),
    img11: asset('HAPPY-WEDDING-ANNIVERSARY.jpg'),
    video1: asset('SUNDAY_SERVICE_WITH_PASTOR_OSAGIE.mp4'),
    video2: asset('STAY_TUNED.mp4'),
  },
};
