const { __ } = wp.i18n;
const {
	registerBlockType,
	RichText,
	MediaUpload,
} = wp.blocks;
const { Button } = wp.components;

registerBlockType( 'aduffell/concert-block', {
	title: __( 'Concert Review' ),
	icon: 'format-audio',
	category: 'widgets',

	// Attributes.
	attributes: {
		artist: {
			type: 'array',
			source: 'children',
			selector: '.concert-artist',
		},
		at: {
			type: 'string',
			default: 'at',
			source: 'html',
			selector: '.concert-at',
		},
		venue: {
			type: 'array',
			source: 'children',
			selector: '.concert-venue',
		},
		on: {
			type: 'string',
			default: 'on',
			source: 'html',
			selector: '.concert-on',
		},
		date: {
			type: 'array',
			source: 'children',
			selector: '.concert-date',
		},
		review: {
			type: 'array',
			source: 'children',
			selector: '.concert-review',
		},
		mediaID: {
			type: 'number',
		},
		mediaURL: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
	},

	// Edit.
	edit: props => {
		const focusedEditable = props.focus ? props.focus.editable || 'artist' : null;
		const attributes = props.attributes;

		// Media field.
		const onSelectImage = media => {
			props.setAttributes( {
				mediaURL: media.url,
				mediaID: media.id,
			} );
		};

		// Artist field.
		const onChangeArtist = value => {
			props.setAttributes( { artist: value } );
		};
		const onFocusArtist = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'artist' } ) );
		};

		// At field.
		const onChangeAt = value => {
			props.setAttributes( { at: value } );
		};
		const onFocusAt = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'at' } ) );
		};

		//Venue field.
		const onChangeVenue = value => {
			props.setAttributes( { venue: value } );
		};
		const onFocusVenue = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'venue' } ) );
		};

		// On field.
		const onChangeOn = value => {
			props.setAttributes( { on: value } );
		};
		const onFocusOn = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'on' } ) );
		};

		// Date field.
		const onChangeDate = value => {
			props.setAttributes( { date: value } );
		};
		const onFocusDate = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'date' } ) );
		};

		// Review field.
		const onChangeReview = value => {
			props.setAttributes( { review: value } );
		};
		const onFocusReview = focus => {
			props.setFocus( _.extend( {}, focus, { editable: 'review' } ) );
		};

		return (
			<div className={ props.className }>
				<h2>	
					<RichText
						tagName="span"
						placeholder={ __( 'Artist(s)' ) }
						value={ attributes.artist }
						onChange={ onChangeArtist }
						focus={ focusedEditable === 'artist' }
						onFocus={ onFocusArtist }
						className="concert-artist"
						wrapperClassName="inline"
					/>
					<span> </span>
					<RichText
						tagName="span"
						placeholder={ __( 'at' ) }
						value={ attributes.at }
						onChange={ onChangeAt }
						focus={ focusedEditable === 'at' }
						onFocus={ onFocusAt }
						className="concert-at"
						wrapperClassName="inline"
					/>
					<span> </span> 
					<RichText
						tagName="span"
						placeholder={ __( 'Venue' ) }
						value={ attributes.venue }
						onChange={ onChangeVenue }
						focus={ focusedEditable === 'venue' }
						onFocus={ onFocusVenue }
						className="concert-venue"
						wrapperClassName="inline"
					/>
					<span> </span> 
					<RichText
						tagName="span"
						placeholder={ __( 'on' ) }
						value={ attributes.on }
						onChange={ onChangeOn }
						focus={ focusedEditable === 'on' }
						onFocus={ onFocusAt }
						className="concert-on"
						wrapperClassName="inline"
					/>
					<span> </span>	
					<RichText
						tagName="span"
						placeholder={ __( 'Date' ) }
						value={ attributes.date }
						onChange={ onChangeDate}
						focus={ focusedEditable === 'date' }
						onFocus={ onFocusDate }
						className="concert-date"
						wrapperClassName="inline"
					/>
				</h2>
				<div className="concert-image">
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ attributes.mediaID }
						render={ ( { open } ) => (
							<Button className={ attributes.mediaID ? 'image-button' : 'button button-large' } onClick={ open }>
								{ ! attributes.mediaID ? __( 'Upload Image' ) : <img src={ attributes.mediaURL } /> }
							</Button>
						) }
					/>
				</div>
				<RichText
					tagName="div"
					multiline="p"
					className="concert-review"
					placeholder={ __( 'Add review' ) }
					value={ attributes.review }
					onChange={ onChangeReview }
					focus={ focusedEditable === 'review' }
					onFocus={ onFocusReview }
				/>
			</div>
		);
	},

	// Save.
	save: props => {
		const {
			className,
			attributes: {
				artist,
				at,
				venue,
				on,
				date,
				review,
				mediaURL
			}
		} = props;
		return (
			<div className={ className }>
				<h2 className="concert-title">
					<span className="concert-artist">{ artist }</span> <span className="concert-at">{ at }</span> <span className="concert-venue">{ venue }</span> <span className="concert-on">{ on }</span> <span className="concert-date">{ date }</span>
				</h2>
				{
					mediaURL && (
						<div className="concert-image">
							<a href={ mediaURL }><img src={ mediaURL } /></a>
						</div>
					)
				}
				<div className="concert-review">
					{ review }
				</div>
			</div>
		);
	}
} );