import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { BsFillShiftFill } from "react-icons/bs";

const ScrollUpButtonComp = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, []);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 500) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      style={{
        display: visible ? "inline" : "none",
        position: "fixed",
        right: "30px",
        bottom: "20px",
        padding: "10px",
        fontSize: "18px",
      }}
      className="btn btn-primary"
      onClick={scrollToTop}
    >
      <BsFillShiftFill />
    </Button>
  );
};

export default ScrollUpButtonComp;

// class ScrollUpButtonComp2 {
//   constructor() {
//     super();
//     this.state = { visible: false };
//     window.addEventListener("scroll", this.toggleVisible);
//   }

//   toggleVisible = () => {
//     const scrolled = document.documentElement.scrollTop;
//     if (scrolled > 500) {
//       this.setState({ visible: true });
//     } else {
//       this.setState({ visible: false });
//     }
//   };

//   scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   render() {
//     return (
//       <button
//         style={{
//           display: this.state.visible ? "inline" : "none",
//           position: "fixed",
//           right: "30px",
//           bottom: "20px",
//           padding: "10px",
//           fontSize: "18px",
//         }}
//         className="btn btn-primary"
//         onClick={this.scrollToTop}
//       >
//         UP
//       </button>
//     );
//   }
// }
