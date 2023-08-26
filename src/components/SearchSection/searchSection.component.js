import React from 'react';
import './searchSection.style.css';
import Form from 'react-bootstrap/Form';
import { GeoAlt } from 'react-bootstrap-icons';

export const SearchSection = ({rating, destinationList, destination, handleChange, randomClicked}) => (
    <div className="search-section">
			<div className="container">
				<div className="row">
                    <div className="col-md-1"></div>
					<div className="col-md-3">
						<div className="filter">
                            <span className="timelineTitle">Filter by Destination<GeoAlt /></span>
                            <Form>
                                { destinationList.map(dest => (
                                    <Form.Check key={dest.replace(' ','')+'location'} className="destination" type="checkbox" label={dest} value={dest} checked={destination.includes(dest)} onClick={handleChange} readOnly />
                                )) }
                            </Form>
						</div>
					</div>
					<div className="col-md-3">
						<div className="filter">
                        <span className="timelineTitle">Or Rating</span>
                            <Form>
                                <Form.Check className="rating" type="checkbox" label="★✰✰✰✰" name="rating" value={1} checked={rating.includes(1)} onClick={handleChange} readOnly />
                                <Form.Check className="rating" type="checkbox" label="★★✰✰✰" value={2} name="rating" checked={rating.includes(2)} onClick={handleChange} readOnly />
                                <Form.Check className="rating" type="checkbox" label="★★★✰✰" value={3} name="rating" checked={rating.includes(3)} onClick={handleChange} readOnly />
                                <Form.Check className="rating" type="checkbox" label="★★★★✰" value={4} name="rating" checked={rating.includes(4)} onClick={handleChange} readOnly />
                                <Form.Check className="rating" type="checkbox" label="★★★★★" value={5} name="rating" checked={rating.includes(5)} onClick={handleChange} readOnly />
                            </Form>
						</div>
					</div>
                    <div className="col-md-3">
                        <div className="btn-filter filter">
                            <span className="timelineTitle">Or Try A</span>
                            <button id="random" className="btn random-btn" onClick={randomClicked}>Random Destination</button>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
				</div>
			</div>
		</div>
)