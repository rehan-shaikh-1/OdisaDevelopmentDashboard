import plotly.graph_objects as go
import json

# Parse the dashboard data
data = {
    "dashboard_sections": [
        {"name": "Header", "content": "Odisha Development Dashboard", "position": "top"},
        {"name": "Controls", "content": ["Metric Selector", "Time Range", "Districts", "Analysis Type"], "position": "left"},
        {"name": "Main Viz", "content": "Primary Visualization", "position": "center"},
        {"name": "Secondary", "content": "Secondary Metrics", "position": "right"},
        {"name": "Correlation", "content": "Correlation Analysis", "position": "bottom-left"},
        {"name": "Summary", "content": "Summary Statistics", "position": "bottom-right"}
    ],
    "layout_specs": {"width": 1200, "height": 800, "sections": 6}
}

# Create figure
fig = go.Figure()

# Brand colors
colors = ['#1FB8CD', '#DB4545', '#2E8B57', '#5D878F', '#D2BA4C', '#B4413C']

# Define section coordinates and sizes
sections = [
    # Header (top, full width)
    {'name': 'Header', 'x0': 0, 'x1': 12, 'y0': 9, 'y1': 10, 'color': colors[0], 'text': 'Odisha Dev Dashboard'},
    
    # Left sidebar (controls)
    {'name': 'Controls', 'x0': 0, 'x1': 2.5, 'y0': 0, 'y1': 9, 'color': colors[1], 'text': 'Controls<br>• Metrics<br>• Time Range<br>• Districts<br>• Analysis'},
    
    # Main visualization (center)
    {'name': 'Main Viz', 'x0': 2.5, 'x1': 8, 'y0': 4, 'y1': 9, 'color': colors[2], 'text': 'Primary Viz'},
    
    # Secondary metrics (right)
    {'name': 'Secondary', 'x0': 8, 'x1': 12, 'y0': 4, 'y1': 9, 'color': colors[3], 'text': 'Secondary<br>Metrics'},
    
    # Correlation analysis (bottom-left)
    {'name': 'Correlation', 'x0': 2.5, 'x1': 7, 'y0': 0, 'y1': 4, 'color': colors[4], 'text': 'Correlation<br>Analysis'},
    
    # Summary statistics (bottom-right)
    {'name': 'Summary', 'x0': 7, 'x1': 12, 'y0': 0, 'y1': 4, 'color': colors[5], 'text': 'Summary Stats<br>Export Options'}
]

# Add rectangles for each section
for i, section in enumerate(sections):
    fig.add_shape(
        type="rect",
        x0=section['x0'], y0=section['y0'],
        x1=section['x1'], y1=section['y1'],
        line=dict(color="white", width=2),
        fillcolor=section['color'],
        opacity=0.3,
        layer="below"
    )
    
    # Add text labels
    fig.add_annotation(
        x=(section['x0'] + section['x1']) / 2,
        y=(section['y0'] + section['y1']) / 2,
        text=section['text'],
        showarrow=False,
        font=dict(size=12, color="black"),
        bgcolor="rgba(255,255,255,0.8)",
        bordercolor="white",
        borderwidth=1
    )

# Update layout
fig.update_xaxes(visible=False, range=[0, 12])
fig.update_yaxes(visible=False, range=[0, 10])

fig.update_layout(
    title="Odisha Dashboard Layout Mockup",
    showlegend=False,
    plot_bgcolor='rgba(0,0,0,0)',
    paper_bgcolor='white'
)

fig.update_traces(cliponaxis=False)

# Save the chart
fig.write_image("dashboard_mockup.png")