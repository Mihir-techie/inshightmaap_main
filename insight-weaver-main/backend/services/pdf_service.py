from reportlab.lib.pagesizes import letter, A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor, yellow
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.pdfgen import canvas
from io import BytesIO
from typing import Dict, Any, List

class PDFService:
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self._setup_custom_styles()
    
    def _setup_custom_styles(self):
        """Setup custom styles for PDF"""
        # Title style
        self.styles.add(ParagraphStyle(
            name='CustomTitle',
            parent=self.styles['Heading1'],
            fontSize=24,
            textColor='#1a1a1a',
            spaceAfter=30,
            alignment=TA_CENTER
        ))
        
        # Section title style
        self.styles.add(ParagraphStyle(
            name='SectionTitle',
            parent=self.styles['Heading2'],
            fontSize=18,
            textColor='#2c3e50',
            spaceAfter=12,
            spaceBefore=20
        ))
        
        # Topic style
        self.styles.add(ParagraphStyle(
            name='TopicStyle',
            parent=self.styles['BodyText'],
            fontSize=12,
            textColor='#34495e',
            leftIndent=20,
            spaceAfter=8
        ))
        
        # Tree node style
        self.styles.add(ParagraphStyle(
            name='TreeNode',
            parent=self.styles['BodyText'],
            fontSize=11,
            textColor='#34495e',
            spaceAfter=4
        ))
        
        # Summary style
        self.styles.add(ParagraphStyle(
            name='SummaryStyle',
            parent=self.styles['BodyText'],
            fontSize=12,
            textColor='#555555',
            spaceAfter=12,
            leading=16
        ))
        
        # Revision point style
        self.styles.add(ParagraphStyle(
            name='RevisionTopic',
            parent=self.styles['Heading3'],
            fontSize=14,
            textColor='#2c3e50',
            spaceAfter=6,
            spaceBefore=12,
            backColor='#fffacd',  # Light yellow background
            borderPadding=8
        ))
        
        # Revision explanation style
        self.styles.add(ParagraphStyle(
            name='RevisionExplanation',
            parent=self.styles['BodyText'],
            fontSize=11,
            textColor='#444444',
            spaceAfter=8,
            leading=14,
            leftIndent=15
        ))
        
        # Focus score style
        self.styles.add(ParagraphStyle(
            name='FocusScoreTopic',
            parent=self.styles['BodyText'],
            fontSize=11,
            textColor='#2c3e50',
            spaceAfter=4
        ))
    
    def generate_pdf(self, analysis_data: Dict[str, Any], filename: str = None) -> BytesIO:
        """
        Generate PDF from analysis data.
        
        Args:
            analysis_data: Dictionary containing summary, keyTopics, and topicTree
            filename: Optional filename for the PDF
            
        Returns:
            BytesIO object containing the PDF
        """
        buffer = BytesIO()
        doc = SimpleDocTemplate(buffer, pagesize=letter, 
                                rightMargin=72, leftMargin=72,
                                topMargin=72, bottomMargin=72)
        
        story = []
        
        # Title
        title = Paragraph("Learning Map Analysis", self.styles['CustomTitle'])
        story.append(title)
        story.append(Spacer(1, 0.3*inch))
        
        # Summary Section
        summary_title = Paragraph("Summary", self.styles['SectionTitle'])
        story.append(summary_title)
        
        summary_text = analysis_data.get('summary', 'No summary available.')
        summary_para = Paragraph(summary_text, self.styles['SummaryStyle'])
        story.append(summary_para)
        story.append(Spacer(1, 0.2*inch))
        
        # Key Topics Section
        key_topics = analysis_data.get('keyTopics', [])
        if key_topics:
            topics_title = Paragraph("Key Topics", self.styles['SectionTitle'])
            story.append(topics_title)
            
            for topic in key_topics:
                topic_para = Paragraph(f"• {topic}", self.styles['TopicStyle'])
                story.append(topic_para)
            
            story.append(Spacer(1, 0.2*inch))
        
        # Topic Tree / Mind Map Section
        topic_tree = analysis_data.get('topicTree', [])
        if topic_tree:
            tree_title = Paragraph("Topic Tree & Mind Map Structure", self.styles['SectionTitle'])
            story.append(tree_title)
            
            # Add note about visual mind map
            note_text = "This is a hierarchical representation of your learning map. For an interactive visual mind map, view the results in the web interface."
            note_para = Paragraph(note_text, self.styles['SummaryStyle'])
            story.append(note_para)
            story.append(Spacer(1, 0.1*inch))
            
            for node in topic_tree:
                self._add_tree_node(story, node, 0)
            
            story.append(Spacer(1, 0.2*inch))
        
        # Revision View Section
        revision_view = analysis_data.get('revisionView')
        if revision_view and revision_view.get('keyPoints'):
            story.append(PageBreak())
            revision_title = Paragraph("Revision Mode - Exam Ready Key Points", self.styles['SectionTitle'])
            story.append(revision_title)
            story.append(Spacer(1, 0.1*inch))
            
            key_points = revision_view.get('keyPoints', [])
            for idx, point in enumerate(key_points[:20], 1):  # Limit to 20 points
                # Topic with yellow highlight
                topic_text = f"{idx}. {point.get('topic', '')}"
                topic_para = Paragraph(topic_text, self.styles['RevisionTopic'])
                story.append(topic_para)
                
                # Explanation
                explanation = point.get('explanation', '')
                if explanation:
                    expl_para = Paragraph(explanation, self.styles['RevisionExplanation'])
                    story.append(expl_para)
                
                # Things to remember
                things_to_remember = point.get('thingsToRemember', [])
                if things_to_remember:
                    for item in things_to_remember:
                        item_para = Paragraph(f"• {item}", self.styles['RevisionExplanation'])
                        story.append(item_para)
                
                story.append(Spacer(1, 0.15*inch))
        
        # Focus Score Heatmap Section
        focus_scores = analysis_data.get('focusScores', [])
        if focus_scores:
            story.append(PageBreak())
            heatmap_title = Paragraph("Focus Score Heatmap - Topic Importance", self.styles['SectionTitle'])
            story.append(heatmap_title)
            story.append(Spacer(1, 0.1*inch))
            
            # Sort by score descending
            sorted_scores = sorted(focus_scores, key=lambda x: x.get('score', 0), reverse=True)
            
            # Create table for focus scores
            table_data = [['Topic', 'Score', 'Density']]
            for item in sorted_scores[:30]:  # Limit to top 30
                topic = item.get('topic', '')
                score = item.get('score', 0)
                density = item.get('density', 'low')
                
                # Color based on density
                if density == 'high' or score >= 0.7:
                    bg_color = '#fffacd'  # Light yellow
                elif density == 'medium' or score >= 0.4:
                    bg_color = '#fffef5'  # Very light yellow
                else:
                    bg_color = '#ffffff'  # White
                
                score_percent = f"{int(score * 100)}%"
                table_data.append([topic, score_percent, density.capitalize()])
            
            # Build table style with row highlighting
            table_style = TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), HexColor('#f0f0f0')),  # Header background
                ('TEXTCOLOR', (0, 0), (-1, 0), HexColor('#2c3e50')),
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('ALIGN', (1, 0), (1, -1), 'CENTER'),
                ('ALIGN', (2, 0), (2, -1), 'CENTER'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, 0), 11),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('BACKGROUND', (0, 1), (-1, -1), HexColor('#ffffff')),
                ('FONTNAME', (0, 1), (-1, -1), 'Helvetica'),
                ('FONTSIZE', (0, 1), (-1, -1), 10),
                ('GRID', (0, 0), (-1, -1), 1, HexColor('#e0e0e0')),
                ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
            ])
            
            # Apply yellow highlighting to high/medium density rows
            for i, item in enumerate(sorted_scores[:30], 1):
                score = item.get('score', 0)
                density = item.get('density', 'low')
                
                if density == 'high' or score >= 0.7:
                    table_style.add('BACKGROUND', (0, i), (-1, i), HexColor('#fffacd'))  # Yellow highlight
                elif density == 'medium' or score >= 0.4:
                    table_style.add('BACKGROUND', (0, i), (-1, i), HexColor('#fffef5'))  # Light yellow
            
            # Create table
            table = Table(table_data, colWidths=[4*inch, 1*inch, 1.5*inch])
            table.setStyle(table_style)
            
            story.append(table)
            story.append(Spacer(1, 0.2*inch))
            
            # Legend
            legend_title = Paragraph("Legend", self.styles['SectionTitle'])
            story.append(legend_title)
            legend_text = "High (≥70%): Important segments - Yellow highlight<br/>Medium (40-69%): Moderate importance - Light yellow<br/>Low (<40%): Less relevant - No highlight"
            legend_para = Paragraph(legend_text, self.styles['SummaryStyle'])
            story.append(legend_para)
        
        # Build PDF
        doc.build(story)
        buffer.seek(0)
        
        return buffer
    
    def _add_tree_node(self, story: List, node: Dict[str, Any], level: int):
        """
        Recursively add tree nodes to PDF story.
        
        Args:
            story: List to append story elements to
            node: Node dictionary with id, label, and optional children
            level: Current nesting level (for indentation)
        """
        indent = level * 20
        label = node.get('label', '')
        
        # Create indentation style based on level
        if level == 0:
            # Root level - use Heading3 style
            node_style = ParagraphStyle(
                name=f'TreeNodeLevel{level}',
                parent=self.styles['Heading3'],
                fontSize=14,
                textColor='#2c3e50',
                leftIndent=indent,
                spaceAfter=6,
                spaceBefore=10 if level == 0 else 4
            )
        elif level == 1:
            # Second level
            node_style = ParagraphStyle(
                name=f'TreeNodeLevel{level}',
                parent=self.styles['BodyText'],
                fontSize=12,
                textColor='#34495e',
                leftIndent=indent + 10,
                spaceAfter=4,
                spaceBefore=6
            )
        else:
            # Deeper levels
            node_style = ParagraphStyle(
                name=f'TreeNodeLevel{level}',
                parent=self.styles['BodyText'],
                fontSize=11,
                textColor='#555555',
                leftIndent=indent + 20,
                spaceAfter=3,
                spaceBefore=3
            )
        
        # Add bullet or numbering based on level
        prefix = "• " if level > 0 else ""
        node_para = Paragraph(f"{prefix}{label}", node_style)
        story.append(node_para)
        
        # Recursively add children
        children = node.get('children', [])
        for child in children:
            self._add_tree_node(story, child, level + 1)
