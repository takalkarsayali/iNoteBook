import React from 'react'

export default function About(props) {


    
  return (
    
    
        <div>
                    <div className="container" >
                    <h1 className = "my-3 mx-3" style={{color : props.mode === 'dark' ? 'white' : '#042743'}}>About Us</h1>
                    <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                           <strong>Add Your Notes</strong>
                        </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            Using this app you can save your personal information,educational information and various other information on our website which you can retrieve later on and use as per your needs
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed"type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <strong>Free to use</strong>
                        </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            This application is totally free to use with no registration fees and absolute free service for the liftime. No extra Costs.
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            <strong>Browser compatible</strong>
                        </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            The iNoteBook website is very compatible with various browsers like chrome,mozilla firefox,Microsoft,yahoo and many more. This website is responsive in every device and work very fluently.
                        </div>
                        </div>
                    </div>
                    </div>

                    
                </div>
            </div>
            
  )
}

