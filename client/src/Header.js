import React, {useState, useEffect} from 'react'
// görgetésre aktiválódjon
export default function Header() {
useEffect(() => {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            setScrollTop(true);
        } else {
            setScrollTop(false);
        }
    });
}, []);

    const [scrollTop, setScrollTop] = useState(false);

    const bottomToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      };

  return (
    <div>
      <header>Freestyle MERN TWT's Rainy Day Program Planner</header>
      {scrollTop && (
        <button onClick={bottomToTop} className="backToTop">
          ↑
        </button>
      )}
    </div>
  )
}
