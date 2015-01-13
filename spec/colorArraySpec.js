describe('color', function(){
    it('should exist', function(){
	expect(color).toBeDefined();
    });

    it('should have a \'array\'', function(){
	expect(color.array).toBeDefined();
    });

    describe('array', function(){
	it('should be a \'function\'', function(){
	    expect(typeof color.array).toBe('function');
	});

	describe('rgb', function(){
	    it('should convert \'rgb\' to correct array', function(){
		[
		    { 'input': 'rgb(0,0,0)', 'expectedOutput': [0, 0, 0, 255] },
		    { 'input': 'rgb(255,0,0)', 'expectedOutput': [255, 0, 0, 255] },
		    { 'input': 'rgb(255, 255, 0)', 'expectedOutput': [255, 255, 0, 255] },
		    { 'input': 'rgb (255, 255, 128)', 'expectedOutput': [255, 255, 128, 255] },
		].forEach(function(data){
		    expect(color.array(data.input)).toEqual(data.expectedOutput);
		});
	    });
	});

    	describe('rgba', function(){
	    it('should convert \'rgba\' to correct array', function(){
		[
		    { 'input': 'rgba(0,0,0,255)', 'expectedOutput': [0, 0, 0, 255] },
		    { 'input': 'rgba(255,0,0,128)', 'expectedOutput': [255, 0, 0, 128] },
		    { 'input': 'rgba(64, 64, 64, 64)', 'expectedOutput': [64, 64, 64, 64] },
		].forEach(function(data){
		    expect(color.array(data.input)).toEqual(data.expectedOutput);
		});
	    });
	});

        describe('doubleHex', function(){
	    it('should convert \'#[0-9a-zA-Z]\' to correct array', function(){
		[
		    { 'input': '#000000', 'expectedOutput': [0, 0, 0, 255] },
		    { 'input': '#FFFFFF', 'expectedOutput': [255, 255, 255, 255] },
		    { 'input': '#FFFF00', 'expectedOutput': [255, 255, 0, 255] },
		].forEach(function(data){
		    expect(color.array(data.input)).toEqual(data.expectedOutput);
		});
	    });
	});
    });
});
