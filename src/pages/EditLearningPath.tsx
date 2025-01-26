import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Plus, Trash2, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Button from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Module {
  id: string;
  title: string;
  resources: {
    id: string;
    title: string;
    type: 'document' | 'video';
    url?: string;
  }[];
  sessions: {
    id: string;
    type: 'video' | 'quiz';
    title: string;
    duration: number;
    topics: string[];
    notes?: string;
    status?: 'scheduled' | 'completed'; // Add status here
  }[];
}

interface LearningPathForm {
  id?: string;
  title: string;
  description: string;
  modules: Module[];
}

export default function EditLearningPath() {
  const { menteeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState<LearningPathForm>({
    title: '',
    description: '',
    modules: []
  });

  useEffect(() => {
    if (location.state?.initialData) {
      setFormData(location.state.initialData);
    }
  }, [location.state]);

  // Reuse these helper functions from CreateLearningPath
  const addModule = () => {
    setFormData(prev => ({
      ...prev,
      modules: [...prev.modules, {
        id: crypto.randomUUID(),
        title: '',
        resources: [],
        sessions: []
      }]
    }));
  };

  const removeModule = (moduleId: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.filter(m => m.id !== moduleId)
    }));
  };

  const updateModule = (moduleId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map(m => 
        m.id === moduleId ? { ...m, [field]: value } : m
      )
    }));
  };

  const addResource = (moduleId: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map(m => 
        m.id === moduleId ? {
          ...m,
          resources: [...m.resources, {
            id: crypto.randomUUID(),
            title: '',
            type: 'document'
          }]
        } : m
      )
    }));
  };

  const addSession = (moduleId: string) => {
    setFormData(prev => ({
      ...prev,
      modules: prev.modules.map(m => 
        m.id === moduleId ? {
          ...m,
          sessions: [...m.sessions, {
            id: crypto.randomUUID(),
            type: 'video',
            title: '',
            duration: 60,
            topics: [],
            status: 'scheduled' // default status
          }]
        } : m
      )
    }));
  };

  const handleSubmit = async () => {
    try {
      // In real app: await updateLearningPath(formData);
      console.log('Updated learning path:', formData);
      navigate(`/mentees/${menteeId}/learning-path`);
    } catch (error) {
      console.error('Failed to update learning path:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Edit Learning Path</h1>
        <p className="text-gray-600">Modify the learning journey for your mentee</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {formData.modules.map((module, index) => (
          <Card key={module.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Module {index + 1}</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeModule(module.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <Input
                value={module.title}
                onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                placeholder="Module Title"
              />

              {/* Resources Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Resources</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addResource(module.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Resource
                  </Button>
                </div>
                <div className="space-y-3">
                  {module.resources.map((resource) => (
                    <div key={resource.id} className="flex gap-3">
                      <Select
                        value={resource.type}
                        onValueChange={(value) => {
                          setFormData(prev => ({
                            ...prev,
                            modules: prev.modules.map(m => 
                              m.id === module.id ? {
                                ...m,
                                resources: m.resources.map(r => 
                                  r.id === resource.id ? { ...r, type: value as 'document' | 'video' } : r
                                )
                              } : m
                            )
                          }));
                        }}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        value={resource.title}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            modules: prev.modules.map(m => 
                              m.id === module.id ? {
                                ...m,
                                resources: m.resources.map(r => 
                                  r.id === resource.id ? { ...r, title: e.target.value } : r
                                )
                              } : m
                            )
                          }));
                        }}
                        placeholder="Resource Title"
                        className="flex-1"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Sessions Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium">Sessions</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addSession(module.id)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Session
                  </Button>
                </div>
                <div className="space-y-3">
                  {module.sessions.map((session) => (
                    <div key={session.id} className="space-y-3 p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className={`text-sm ${session.status === 'completed' ? 'text-green-500 font-medium' : ''}`}>
                          {session.status === 'completed' ? '✓ Completed' : 'Pending'}
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <Select
                          value={session.type}
                          onValueChange={(value) => {
                            setFormData(prev => ({
                              ...prev,
                              modules: prev.modules.map(m => 
                                m.id === module.id ? {
                                  ...m,
                                  sessions: m.sessions.map(s => 
                                    s.id === session.id ? { ...s, type: value as 'video' | 'quiz' } : s
                                  )
                                } : m
                              )
                            }));
                          }}
                          disabled={session.status === 'completed'}
                        >
                          <SelectTrigger className="w-[150px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="video">Video Session</SelectItem>
                            <SelectItem value="quiz">Quiz</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          value={session.title}
                          onChange={(e) => {
                            setFormData(prev => ({
                              ...prev,
                              modules: prev.modules.map(m => 
                                m.id === module.id ? {
                                  ...m,
                                  sessions: m.sessions.map(s => 
                                    s.id === session.id ? { ...s, title: e.target.value } : s
                                  )
                                } : m
                              )
                            }));
                          }}
                          placeholder="Session Title"
                          className="flex-1"
                          disabled={session.status === 'completed'}
                        />
                      </div>
                      <Input
                        type="number"
                        value={session.duration}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            modules: prev.modules.map(m => 
                              m.id === module.id ? {
                                ...m,
                                sessions: m.sessions.map(s => 
                                  s.id === session.id ? { ...s, duration: parseInt(e.target.value) } : s
                                )
                              } : m
                            )
                          }));
                        }}
                        placeholder="Duration (minutes)"
                        className="w-[200px]"
                        disabled={session.status === 'completed'}
                      />
                    {session.status === 'completed' && (
                      <Textarea
                        value={session.notes}
                        onChange={(e) => {
                          setFormData(prev => ({
                            ...prev,
                            modules: prev.modules.map(m => 
                              m.id === module.id ? {
                                ...m,
                                sessions: m.sessions.map(s => 
                                  s.id === session.id ? { ...s, notes: e.target.value } : s
                                )
                              } : m
                            )
                          }));
                        }}
                        placeholder="Session notes"
                        rows={2}
                        disabled={session.status === 'completed'}
                      />
                    )}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <Button onClick={addModule} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Module
        </Button>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}