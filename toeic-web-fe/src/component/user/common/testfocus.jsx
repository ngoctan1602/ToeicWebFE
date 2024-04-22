import React, { useRef, useState } from 'react';

function Focus() {
    const divRefs = useRef([]);
    const [focusDiv, setFocusDiv] = useState(-1);
    const scrollToDiv = (index) => {
        if (divRefs.current[index]) {
            // Check if the div's height is greater than viewport height
            // const divHeight = divRefs.current[index].offsetHeight;
            // const viewportHeight = window.innerHeight;

            // if (divHeight < viewportHeight) {
            //     // Scroll to the div
            //     divRefs.current[index].scrollIntoView({ behavior: 'smooth' });
            // }
            divRefs.current[index].scrollIntoView({ behavior: 'smooth' });
        }
        setFocusDiv(index)
    };

    return (
        <div>
            <button onClick={() => scrollToDiv(0)}>Focus Div 1</button>
            <button onClick={() => scrollToDiv(1)}>Focus Div 2</button>
            <button onClick={() => scrollToDiv(2)}>Focus Div 3</button>

            <div
                ref={(ref) => (divRefs.current[0] = ref)}

                style={{ background: focusDiv === 0 && 'red', border: '1px solid black', padding: '20px', marginBottom: '20px' }}
            >
                Div 1. This div is shorter than the viewport height.
                Div 2. This div is taller than the viewport height. Scroll to see the bottom.
                <br />

                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget eros nec libero iaculis varius.
                Phasellus vehicula leo vel ante vehicula, ac convallis arcu ullamcorper. Sed sit amet diam eget purus vestibulum fermentum.
                Duis accumsan ex nec odio commodo, non vehicula lectus posuere. Mauris a sem et odio volutpat congue.
                Phasellus lobortis purus et metus tempus mollis. Vestibulum vitae velit libero. In vitae urna enim.
            </div>

            <div
                ref={(ref) => (divRefs.current[1] = ref)}
                style={{ border: '1px solid black', padding: '20px', marginBottom: '20px' }}
            >
                Div 2. This div is taller than the viewport height. Scroll to see the bottom.
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget eros nec libero iaculis varius.
                Phasellus vehicula leo vel ante vehicula, ac convallis arcu ullamcorper. Sed sit amet diam eget purus vestibulum fermentum.
                Duis accumsan ex nec odio commodo, non vehicula lectus posuere. Mauris a sem et odio volutpat congue.
                Phasellus lobortis purus et metus tempus mollis. Vestibulum vitae velit libero. In vitae urna enim.
                Div 2. This div is taller than the viewport height. Scroll to see the bottom.
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget eros nec libero iaculis varius.
                Phasellus vehicula leo vel ante vehicula, ac convallis arcu ullamcorper. Sed sit amet diam eget purus vestibulum fermentum.
                Duis accumsan ex nec odio commodo, non vehicula lectus posuere. Mauris a sem et odio volutpat congue.
                Phasellus lobortis purus et metus tempus mollis. Vestibulum vitae velit libero. In vitae urna enim.
                Div 2. This div is taller than the viewport height. Scroll to see the bottom.
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget eros nec libero iaculis varius.
                Phasellus vehicula leo vel ante vehicula, ac convallis arcu ullamcorper. Sed sit amet diam eget purus vestibulum fermentum.
                Duis accumsan ex nec odio commodo, non vehicula lectus posuere. Mauris a sem et odio volutpat congue.
                Phasellus lobortis purus et metus tempus mollis. Vestibulum vitae velit libero. In vitae urna enim.
                Div 2. This div is taller than the viewport height. Scroll to see the bottom.
                <br />
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget eros nec libero iaculis varius.
                Phasellus vehicula leo vel ante vehicula, ac convallis arcu ullamcorper. Sed sit amet diam eget purus vestibulum fermentum.
                Duis accumsan ex nec odio commodo, non vehicula lectus posuere. Mauris a sem et odio volutpat congue.
                Phasellus lobortis purus et metus tempus mollis. Vestibulum vitae velit libero. In vitae urna enim.
                Div 2. This div is taller than the viewport height. Scroll to see the bottom.


                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget eros nec libero iaculis varius.
                Phasellus vehicula leo vel ante vehicula, ac convallis arcu ullamcorper. Sed sit amet diam eget purus vestibulum fermentum.
                Duis accumsan ex nec odio commodo, non vehicula lectus posuere. Mauris a sem et odio volutpat congue.
                Phasellus lobortis purus et metus tempus mollis. Vestibulum vitae velit libero. In vitae urna enim.

            </div>

            <div
                ref={(ref) => (divRefs.current[2] = ref)}
                style={{ border: '1px solid black', padding: '20px', marginBottom: '20px' }}
            >
                Div 3. This div is shorter than the viewport height.
            </div>
        </div>
    );
}

export default Focus;
