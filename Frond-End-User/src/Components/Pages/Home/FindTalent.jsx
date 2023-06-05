import React from 'react'
import FindTalentImg from '../../../assets/FindTalent.png'

function FindTalent() {
  return (
    <div className='bg-primary'>
        <div className='grid lg:grid-cols-2 px-4 pt-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-2xl md:px-24 lg:px-8'>
            <div className='p-10 flex justify-end'>
                <img src={FindTalentImg} alt="" />
            </div>
            <div className='p-5'>
                <h1 className='text-5xl font-bold tracking-wider leading-snug mb-10'>
                    We Build Lasting <br /> Relationships Between <br /> Candidates & Bussinesses
                </h1>
                <p className='text-xl text-gray-500 tracking-wider leading-snug pt-5'>
                The automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes. Placeholder text commonly used.
                </p>
                <p className='text-xl text-gray-500 tracking-wider leading-snug pt-5'>
                Automated process starts as soon as your clothes go into the machine. The outcome is gleaming clothes. Placeholder text commonly used.
                </p>
                <div className='py-10'>
                  <button className=' bg-myBlue text-white text-lg font-bold py-4 px-8 rounded-xl mx-5 '>FIND TALENT</button>
                    
                </div>
            </div>

        </div>
    </div>
  )
}

export default FindTalent