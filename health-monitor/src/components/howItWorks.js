import React from 'react'
import Navbar from './Functions/Navbar'
import { Container, Row, Col, Card } from "react-bootstrap";
import { Person, FileEarmarkText, HeartPulse, Cpu, ShieldLock, Database } from "react-bootstrap-icons";
import { useLoading } from "../context/LoadingContext";
import { useEffect } from 'react';


const steps = [
  { icon: <Person size={30} />, title: "User Registration & Login", description: "Users create an account and log in securely to manage health records." },
  { icon: <FileEarmarkText size={30} />, title: "Health Record Management", description: "Upload and store medical reports, prescriptions, and past records in one place." },
  { icon: <HeartPulse size={30} />, title: "Symptom-Based Prediction", description: "Enter symptoms and get predictions for diabetes, heart disease, and liver diseases." },
  { icon: <Cpu size={30} />, title: "AI-Powered Analysis", description: "Machine learning models analyze data to provide accurate health predictions." },
  { icon: <ShieldLock size={30} />, title: "Result & Recommendations", description: "Get prediction results along with precautionary measures and lifestyle suggestions." },
  { icon: <Database size={30} />, title: "Secure Data Storage", description: "User data is stored securely with encryption to maintain privacy and confidentiality." },
];

const HowItWorks = () => {
  const { loading, setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }, []);


  return (
    <div>
      return (
      <Container className="py-5">
        <h2 className="text-center mb-4">How It Works</h2>
        <Row className="g-4">
          {steps.map((step, index) => (
            <Col md={6} key={index}>
              <Card className="p-3 shadow-sm border-0">
                <div className="d-flex align-items-center gap-3">
                  <div className="text" style={{color:"#008B8B"}}>{step.icon}</div>
                  <div>
                    <h5 className="mb-1">{step.title}</h5>
                    <p className="text-muted mb-0">{step.description}</p>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      );
    </div>
  )
}

export default HowItWorks
